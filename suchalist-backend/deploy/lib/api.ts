import { Construct } from "constructs";
import { Fn } from "aws-cdk-lib";
import {
  API_GATEWAY_DOMAIN,
  API_GATEWAY_SUBDOMAIN,
  ENVIRONMENT,
} from "./config";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import {
  Cors,
  EndpointType,
  RestApi,
  SecurityPolicy,
} from "aws-cdk-lib/aws-apigateway";
import { ApiGateway } from "aws-cdk-lib/aws-route53-targets";

export class Api {
  readonly api: RestApi;

  constructor(scope: Construct) {
    const zone = HostedZone.fromHostedZoneAttributes(scope, "hosted-zone", {
      hostedZoneId: Fn.importValue("koala-tek-hosted-zone-id"),
      zoneName: Fn.importValue("koala-tek-hosted-zone-name"),
    });

    const apiGatewayCertificate = new Certificate(scope, "backend-cert", {
      domainName: API_GATEWAY_DOMAIN,
      validation: CertificateValidation.fromDns(zone),
    });

    this.api = new RestApi(scope, "rest-api", {
      restApiName: `suchalist-rest-api-${ENVIRONMENT}`,
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
      domainName: {
        // The custom domain name for the API.
        domainName: API_GATEWAY_DOMAIN,
        // Determines where requests to the custom domain name will be routed to.
        // Here the requests will be routed to an endpoint at the edge location closest to the client.
        endpointType: EndpointType.EDGE,
        certificate: apiGatewayCertificate,
        securityPolicy: SecurityPolicy.TLS_1_2,
      },
      // Determines where the REST API will accept requests from.
      // For example, if you set endpointConfiguration.types to [EndpointType.REGIONAL, EndpointType.EDGE],
      // your REST API would accept requests at both the regional endpoint and the edge endpoint closest to the client.
      endpointConfiguration: {
        types: [EndpointType.REGIONAL],
      },
      deployOptions: {
        stageName: ENVIRONMENT,
        tracingEnabled: true,
      },
    });

    const apiGateway = new ApiGateway(this.api);

    new ARecord(scope, "route-to-api-gateway", {
      target: RecordTarget.fromAlias(apiGateway),
      recordName: API_GATEWAY_SUBDOMAIN,
      zone,
    });
  }
}
