import { NotificationTypeV2 } from "@apple/app-store-server-library";
import { UnreachableError } from "../../../base/error";
import { handleSubscribed } from "./subscribed-notification-handler";
import { handleDidRenew } from "./did-renew-notification-handler";
import { handleExpired } from "./expired-notification-handler";
import { handleDidFailToRenew } from "./did-fail-to-renew-notification-handler";
import { handleGracePeriodExpired } from "./grace-period-expired-notification-handler";
import { handleOneTimeChange } from "./one-time-change-notification-handler";
import { signedDataVerifier } from "../../../utils/apple/signed_data_verifier";

export const handler = async (request: any) => {
  console.log(request);
  const signedPayload = JSON.parse(request.body).signedPayload ?? "";

  try {
    const verifiedNotification =
      await signedDataVerifier.verifyAndDecodeNotification(signedPayload);
    console.log(verifiedNotification);

    const [renewalInfo, transaction] = await Promise.all([
      signedDataVerifier.verifyAndDecodeRenewalInfo(
        verifiedNotification.data?.signedRenewalInfo ?? ""
      ),
      signedDataVerifier.verifyAndDecodeTransaction(
        verifiedNotification.data?.signedTransactionInfo ?? ""
      ),
    ]);
    console.log({
      renewalInfo,
      transaction,
    });

    switch (verifiedNotification.notificationType) {
      case NotificationTypeV2.SUBSCRIBED:
        handleSubscribed(verifiedNotification);
        break;
      case NotificationTypeV2.DID_RENEW:
        handleDidRenew(verifiedNotification);
        break;
      case NotificationTypeV2.EXPIRED:
        handleExpired(verifiedNotification);
        break;
      case NotificationTypeV2.DID_FAIL_TO_RENEW:
        handleDidFailToRenew(verifiedNotification);
        break;
      case NotificationTypeV2.GRACE_PERIOD_EXPIRED:
        handleGracePeriodExpired(verifiedNotification);
        break;
      case NotificationTypeV2.ONE_TIME_CHARGE:
        handleOneTimeChange(verifiedNotification);
        break;
      case NotificationTypeV2.DID_CHANGE_RENEWAL_PREF:
      case NotificationTypeV2.DID_CHANGE_RENEWAL_STATUS:
      case NotificationTypeV2.OFFER_REDEEMED:
      case NotificationTypeV2.PRICE_INCREASE:
      case NotificationTypeV2.REFUND:
      case NotificationTypeV2.REFUND_DECLINED:
      case NotificationTypeV2.CONSUMPTION_REQUEST:
      case NotificationTypeV2.RENEWAL_EXTENDED:
      case NotificationTypeV2.REVOKE:
      case NotificationTypeV2.TEST:
      case NotificationTypeV2.RENEWAL_EXTENSION:
      case NotificationTypeV2.REFUND_REVERSED:
      case NotificationTypeV2.EXTERNAL_PURCHASE_TOKEN:
        console.log(`Not handled: ${verifiedNotification.notificationType}`);
        break;
      default:
        if (
          typeof verifiedNotification.notificationType === "string" ||
          verifiedNotification.notificationType === undefined
        ) {
          console.log("Weird");
          return;
        }

        throw new UnreachableError(verifiedNotification.notificationType);
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
      }),
    };
  } catch (e) {
    console.error(e);

    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: false,
      }),
    };
  }
};
