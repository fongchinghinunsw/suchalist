import { CfnWebACL, CfnWebACLAssociation } from "aws-cdk-lib/aws-wafv2";
import { Construct } from "constructs";
import { AWS_REGION, ENVIRONMENT } from "./config";
import { rateLimitRuleFor } from "./utils/waf-rule";
import { Api } from "./api";

export class Waf {
  constructor(scope: Construct, { api }: Api) {
    // if an IP address is sending more than 100 requests to the ApiGateway within 5 minutes,
    // it receives 403 Forbidden with the following response body.
    // {
    //     "message": "Forbidden"
    // }
    const rules = [
      rateLimitRuleFor({
        name: `whale-app-backend-${ENVIRONMENT}`,
        priority: 1,
        limit: 100,
      }),
    ];

    const webAcl = new CfnWebACL(scope, "waf-acl", {
      name: `whale-app-waf-acl-${ENVIRONMENT}`,
      scope: "REGIONAL",
      defaultAction: {
        allow: {},
      },
      visibilityConfig: {
        metricName: `whale-app-waf-acl-metric-${ENVIRONMENT}`,
        cloudWatchMetricsEnabled: true,
        sampledRequestsEnabled: true,
      },
      rules,
    });

    new CfnWebACLAssociation(scope, "web-acl-association", {
      resourceArn: `arn:aws:apigateway:${AWS_REGION}::/restapis/${api.restApiId}/stages/${api.deploymentStage.stageName}`,
      webAclArn: webAcl.attrArn,
    });
  }
}
