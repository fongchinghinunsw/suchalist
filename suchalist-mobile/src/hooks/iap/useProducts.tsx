import {isSupportedSubscriptionProduct} from '@/utils/iap/subscription';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  getSubscriptions,
  SubscriptionAndroid,
  SubscriptionIOS,
} from 'react-native-iap';

export function useProducts(isIAPInitialized: boolean) {
  const [subscriptions, setSubscriptions] = useState<
    (SubscriptionAndroid | SubscriptionIOS)[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const getProductIds = Platform.select({
          ios: async () => [
            'com.suchalist.subscription.suchalist_pro_monthly',
            'com.suchalist.subscription.suchalist_pro_yearly',
          ],
          android: async () => [],
          default: async () => [],
        });

        const skus = await getProductIds();
        console.log('==== skus ====');
        console.log(skus ?? []);

        const subs = await getSubscriptions({skus: skus ?? []});
        console.log(subs);
        setSubscriptions(subs.filter(isSupportedSubscriptionProduct));
      } catch (err) {
        console.warn('Failed to fetch subscriptions:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isIAPInitialized) {
      fetchProducts();
    }
  }, [isIAPInitialized]);

  console.log({subscriptions, loading});

  return {subscriptions, loading};
}
