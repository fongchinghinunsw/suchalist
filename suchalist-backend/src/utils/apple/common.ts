import { Environment } from "@apple/app-store-server-library";
import { ENVIRONMENT } from "../../base/config";

export const bundleId = "com.suchalist";
export const appAppleId = 6745402619;
export const environment =
  ENVIRONMENT === "prod" ? Environment.PRODUCTION : Environment.SANDBOX;
