import fs from "node:fs";
import { SignedDataVerifier } from "@apple/app-store-server-library";
import { appAppleId, bundleId, environment } from "./common";

const appleRootCAs: Buffer[] = loadAppleRootCAs();
const enableOnlineChecks = true;

export const signedDataVerifier = new SignedDataVerifier(
  appleRootCAs,
  enableOnlineChecks,
  environment,
  bundleId,
  appAppleId
);

function loadAppleRootCAs() {
  const basePath = `${__dirname}/certificates`;
  return [
    fs.readFileSync(`${basePath}/AppleIncRootCertificate.cer`),
    fs.readFileSync(`${basePath}/AppleRootCA-G2.cer`),
    fs.readFileSync(`${basePath}/AppleRootCA-G3.cer`),
  ];
}
