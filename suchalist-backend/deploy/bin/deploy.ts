#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { SuchalistBackendStack } from "../lib/suchalist-backend-stack";
import { AWS_ACCOUNT_ID, AWS_REGION, ENVIRONMENT } from "../lib/config";

const app = new cdk.App();
new SuchalistBackendStack(app, `suchalist-backend-stack-${ENVIRONMENT}`, {
  env: { account: AWS_ACCOUNT_ID, region: AWS_REGION },
});
