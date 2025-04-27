import { Construct } from "constructs";
import { Api } from "../api";
import addAppleVersionResource from "./apple/version-function";
import addGoogleVersionResource from "./google/version-function";

export class Functions {
  constructor(scope: Construct, { api }: Api) {
    const appleResource = api.root.addResource("apple");
    const googleResource = api.root.addResource("google");

    addAppleVersionResource(scope, {
      appleResource,
    });

    addGoogleVersionResource(scope, {
      googleResource,
    });
  }
}
