import { ResponseBodyV2DecodedPayload } from "@apple/app-store-server-library";

export function handleGracePeriodExpired(
  verifiedNotification: ResponseBodyV2DecodedPayload
) {
  console.log("===== Handling GRACE_PERIOD_EXPIRED Notification =====");
}
