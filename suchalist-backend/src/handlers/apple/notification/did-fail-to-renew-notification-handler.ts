import { ResponseBodyV2DecodedPayload } from "@apple/app-store-server-library";

export function handleDidFailToRenew(
  verifiedNotification: ResponseBodyV2DecodedPayload
) {
  console.log("===== Handling DID_FAIL_TO_RENEW Notification =====");
}
