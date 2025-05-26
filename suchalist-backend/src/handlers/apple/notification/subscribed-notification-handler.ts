import { ResponseBodyV2DecodedPayload } from "@apple/app-store-server-library";

export function handleSubscribed(
  verifiedNotification: ResponseBodyV2DecodedPayload
) {
  console.log("===== Handling SUBSCRIBED Notification =====");
}
