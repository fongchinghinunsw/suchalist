import { ResponseBodyV2DecodedPayload } from "@apple/app-store-server-library";

export function handleOneTimeChange(
  verifiedNotification: ResponseBodyV2DecodedPayload
) {
  console.log("===== Handling ONE_TIME_CHARGE Notification =====");
}
