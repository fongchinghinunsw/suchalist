import fs from "node:fs";
import { AppStoreServerAPIClient } from "@apple/app-store-server-library";
import { bundleId, environment } from "./common";

// TODO: Move to somewhere more secure from local
const issuerId = process.env.APPLE_ISSUER_ID ?? "";
const keyId = process.env.APPLE_KEY_ID ?? "";
const filePath = `${__dirname}/app_store_connect_api_key.p8`;
const encodedKey = fs.readFileSync(filePath).toString();

export const appStoreServerApiClient = new AppStoreServerAPIClient(
  encodedKey,
  keyId,
  issuerId,
  bundleId,
  environment
);
