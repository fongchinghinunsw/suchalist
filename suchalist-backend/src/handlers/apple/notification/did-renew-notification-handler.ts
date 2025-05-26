import { ResponseBodyV2DecodedPayload } from "@apple/app-store-server-library";

export function handleDidRenew(
  verifiedNotification: ResponseBodyV2DecodedPayload
) {
  console.log("===== Handling DID_RENEW Notification =====");
}
