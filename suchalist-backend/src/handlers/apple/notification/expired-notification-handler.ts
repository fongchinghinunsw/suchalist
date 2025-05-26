import { ResponseBodyV2DecodedPayload } from "@apple/app-store-server-library";

export function handleExpired(
  verifiedNotification: ResponseBodyV2DecodedPayload
) {
  console.log("===== Handling EXPIRED Notification =====");
}
