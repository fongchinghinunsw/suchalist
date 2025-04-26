import {
  AuthorizationType,
  IResource,
  LambdaIntegration,
} from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { ENVIRONMENT } from "../../config";
import { functionPropsFor } from "../../utils/function-props";

export default function addVersionResource(
  scope: Construct,
  {
    appleResource,
  }: {
    appleResource: IResource;
  }
) {
  const resourceName = "version";
  const lambda = new NodejsFunction(
    scope,
    `lambda-${resourceName}`,
    functionPropsFor({
      name: `suchalist-lambda-apple-${resourceName}-${ENVIRONMENT}`,
      description: "Apple App Store App Version",
      entry: `handlers/apple/version/handler.ts`,
      memorySize: 1024,
      bundling: {
        externalModules: ["aws-sdk"],
      },
    })
  );

  appleResource
    .addResource(resourceName)
    .addMethod("GET", new LambdaIntegration(lambda), {
      authorizationType: AuthorizationType.NONE,
    });
}
