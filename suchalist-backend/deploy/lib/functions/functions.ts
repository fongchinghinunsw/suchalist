import { Construct } from "constructs";
import { Api } from "../api";
import addVersionResource from "./apple/version-function";

export class Functions {
  constructor(scope: Construct, { api }: Api) {
    const appleResource = api.root.addResource("apple");

    addVersionResource(scope, {
      appleResource,
    });
  }
}
