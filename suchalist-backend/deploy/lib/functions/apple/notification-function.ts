import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { functionPropsFor } from "../../utils/function-props";
import { ENVIRONMENT } from "../../config";
import { Construct } from "constructs";
import {
  AuthorizationType,
  IResource,
  LambdaIntegration,
} from "aws-cdk-lib/aws-apigateway";

export default function addNotificationResource(
  scope: Construct,
  {
    appleResource,
  }: {
    appleResource: IResource;
  }
) {
  const resourceName = "notification";
  const lambda = new NodejsFunction(
    scope,
    `lambda-${resourceName}`,
    functionPropsFor({
      name: `suchalist-lambda-apple-${resourceName}-${ENVIRONMENT}`,
      description: "App Store Server Notification",
      entry: `handlers/apple/notification/handler.ts`,
      memorySize: 1024,
      bundling: {
        externalModules: ["aws-sdk"], // Exclude AWS SDK as it's provided in the Lambda runtime
        commandHooks: {
          beforeBundling(inputDir: string, outputDir: string): string[] {
            return [
              `mkdir -p ${outputDir}/certificates`,
              `cp ${inputDir}src/resources/certificates/* ${outputDir}/certificates/`,
              // `cp ${inputDir}app_store_connect_api_key.p8 ${outputDir}/app_store_connect_api_key.p8`,
            ];
          },
          afterBundling(): string[] {
            return [];
          },
          beforeInstall(): string[] {
            return [];
          },
        },
      },
    })
  );

  appleResource
    .addResource(resourceName)
    .addMethod("POST", new LambdaIntegration(lambda), {
      authorizationType: AuthorizationType.NONE,
    });
}
