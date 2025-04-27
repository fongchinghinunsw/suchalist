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
    googleResource,
  }: {
    googleResource: IResource;
  }
) {
  const resourceName = "version";
  const lambda = new NodejsFunction(
    scope,
    `lambda-google-${resourceName}`,
    functionPropsFor({
      name: `suchalist-lambda-google-${resourceName}-${ENVIRONMENT}`,
      description: "Google Play Store App Version",
      entry: `handlers/google/version/handler.ts`,
      memorySize: 1024,
      bundling: {
        externalModules: ["aws-sdk"],
      },
    })
  );

  googleResource
    .addResource(resourceName)
    .addMethod("GET", new LambdaIntegration(lambda), {
      authorizationType: AuthorizationType.NONE,
    });
}
