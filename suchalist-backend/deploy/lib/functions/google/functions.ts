import { Construct } from "constructs";
import { Api } from "../../api";
import addVersionResource from "./version-function";
import addNotificationResource from "./notification-function";

export class GoogleFunctions {
  constructor(scope: Construct, { api }: Api) {
    const googleResource = api.root.addResource("google");

    addVersionResource(scope, {
      googleResource,
    });

    addNotificationResource(scope, {
      googleResource,
    });
  }
}
