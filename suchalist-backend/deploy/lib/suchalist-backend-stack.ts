import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Api } from "./api";
// import { Waf } from "./waf";
import { AppleFunctions } from "./functions/apple/functions";
import { GoogleFunctions } from "./functions/google/functions";

export class SuchalistBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new Api(this);
    // new Waf(this, api);
    new AppleFunctions(this, api);
    new GoogleFunctions(this, api);
  }
}
