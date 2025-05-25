import {isAndroidSubscriptionProduct} from '@/utils/iap/subscription';
import {
  requestSubscription,
  SubscriptionAndroid,
  SubscriptionIOS,
} from 'react-native-iap';
import AppleSubscriptionProduct from './AppleSubscriptionProduct';
import GoogleSubscriptionProduct from './GoogleSubscriptionProduct';

type Props = {
  product: SubscriptionAndroid | SubscriptionIOS;
};

export default function SubscriptionProduct({product}: Props) {
  const subscribe = async (sku: string, offerToken?: string) => {
    try {
      await requestSubscription({
        sku,
        ...(offerToken && {subscriptionOffers: [{sku, offerToken}]}),
      });
    } catch (error) {
      console.warn(error);
    }
  };

  if (isAndroidSubscriptionProduct(product)) {
    return (
      <GoogleSubscriptionProduct product={product} subscribe={subscribe} />
    );
  }

  return <AppleSubscriptionProduct product={product} subscribe={subscribe} />;
}
