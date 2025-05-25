import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  clearTransactionIOS,
  endConnection,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  initConnection,
  ProductPurchase,
  PurchaseError,
  purchaseErrorListener,
  purchaseUpdatedListener,
  SubscriptionPurchase,
} from 'react-native-iap';

let purchaseUpdateSubscription: ReturnType<typeof purchaseUpdatedListener>;
let purchaseErrorSubscription: ReturnType<typeof purchaseErrorListener>;

export function useIAPInit() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        console.log('init connection');
        await initConnection();
      } catch (error) {
        // it could be the device doesn't have Play Store or
        // the user hasn't signed in to the Play Store
        console.log('error connecting to the store...', error);
      }

      if (Platform.OS === 'ios') {
        // remove the finished transactions from the transaction queue
        await clearTransactionIOS();
      }

      if (Platform.OS === 'android') {
        try {
          // make sure that "ghost" pending payment are removed, these are failed pending
          // payment that are still marked as pending in Google's native Vending module cache
          await flushFailedPurchasesCachedAsPendingAndroid();
        } catch (error) {
          // exception can happen here if:
          // there are pending purchases that are still pending (we can't consume a pending purchase)
          // in any case, you might not want to do anything special with the error
          console.log({error});
        }
      }

      //   try {
      //     const purchaseHistory = await getPurchaseHistory();

      //     if (purchaseHistory.length > 0) {
      //       const receipt =
      //         purchaseHistory[purchaseHistory.length - 1].transactionReceipt;
      //       console.log({receipt});
      //       // await validate(receipt);
      //     } else {
      //       console.log('no purchase history');
      //     }
      //   } catch (error) {
      //     console.log('getPurchaseHistory', {error});
      //   }

      console.log('Initialized');
      setIsInitialized(true);
    };

    init().then(() => {
      purchaseUpdateSubscription = purchaseUpdatedListener(
        async (purchase: SubscriptionPurchase | ProductPurchase) => {
          console.log('purchaseUpdatedListener', purchase);
          const transactionId = purchase.transactionId;

          if (transactionId) {
            // const isValid = await validateReceipt(transactionId);
            const isValid = true;
            console.log({transactionId, isValid});

            if (isValid) {
              console.log('finishTransaction');
              await finishTransaction({purchase});
            }
          }
        },
      );

      purchaseErrorSubscription = purchaseErrorListener(
        (error: PurchaseError) => {
          console.warn('purchaseErrorListener', error);
        },
      );
    });

    return () => {
      endConnection();
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, []);

  return {
    isInitialized,
  };
}
