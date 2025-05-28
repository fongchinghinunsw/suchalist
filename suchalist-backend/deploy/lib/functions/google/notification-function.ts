import {
  AuthorizationType,
  IResource,
  LambdaIntegration,
} from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { ENVIRONMENT } from "../../config";
import { functionPropsFor } from "../../utils/function-props";

export default function addNotificationResource(
  scope: Construct,
  {
    googleResource,
  }: {
    googleResource: IResource;
  }
) {
  if (ENVIRONMENT === "dev") {
    return;
  }

  const resourceName = "notification";
  const lambda = new NodejsFunction(
    scope,
    `lambda-${resourceName}`,
    functionPropsFor({
      name: `suchalist-lambda-google-${resourceName}-${ENVIRONMENT}`,
      description: "App Store Server Notification",
      entry: `handlers/google/notification/handler.ts`,
      memorySize: 1024,
      bundling: {
        externalModules: ["aws-sdk"], // Exclude AWS SDK as it's provided in the Lambda runtime
      },
    })
  );

  googleResource
    .addResource(resourceName)
    .addMethod("POST", new LambdaIntegration(lambda), {
      authorizationType: AuthorizationType.NONE,
    });
}
