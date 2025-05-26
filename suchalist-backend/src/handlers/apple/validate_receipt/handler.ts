import { appStoreServerApiClient } from "../../../utils/apple/app_store_service_api_client";
import { signedDataVerifier } from "../../../utils/apple/signed_data_verifier";

export const handler = async (request: any) => {
  try {
    const transactionId = JSON.parse(request.body).transactionId;
    console.log({ transactionId });

    if (transactionId != null) {
      const transactionInfoResponse =
        await appStoreServerApiClient.getTransactionInfo(transactionId);
      console.log({ transactionInfoResponse });
      const payload = await signedDataVerifier.verifyAndDecodeTransaction(
        transactionInfoResponse.signedTransactionInfo ?? ""
      );
      console.log({ payload });
    } else {
      throw new Error("transactionID doesn't exist");
    }

    console.log("returning success result");
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
  } catch (error) {
    console.log({ error });
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
