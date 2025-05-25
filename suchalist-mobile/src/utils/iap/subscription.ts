import {
  Subscription,
  SubscriptionAndroid,
  SubscriptionIOS,
  SubscriptionPlatform,
} from 'react-native-iap';

export function isSupportedSubscriptionProduct(product: Subscription) {
  return (
    product.platform === SubscriptionPlatform.android ||
    product.platform === SubscriptionPlatform.ios
  );
}

export function isAndroidSubscriptionProduct(
  product: SubscriptionAndroid | SubscriptionIOS,
): product is SubscriptionAndroid {
  return product.platform === SubscriptionPlatform.android;
}
