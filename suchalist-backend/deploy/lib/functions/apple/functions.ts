import { Construct } from "constructs";
import { Api } from "../../api";
import addVersionResource from "./version-function";
import addNotificationResource from "./notification-function";

export class AppleFunctions {
  constructor(scope: Construct, { api }: Api) {
    const appleResource = api.root.addResource("apple");

    addVersionResource(scope, {
      appleResource,
    });

    addNotificationResource(scope, {
      appleResource,
    });
  }
}
