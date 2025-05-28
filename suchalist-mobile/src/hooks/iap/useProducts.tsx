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
        const getSubscriptionProductIds = Platform.select({
          ios: () => [
            'com.suchalist.subscription.suchalist_pro_monthly',
            'com.suchalist.subscription.suchalist_pro_yearly',
          ],
          android: () => ['pro-monthly', 'pro-yearly'],
          default: () => [],
        });

        const subscriptionProductIds = getSubscriptionProductIds();
        const subs = await getSubscriptions({
          skus: subscriptionProductIds ?? [],
        });

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
