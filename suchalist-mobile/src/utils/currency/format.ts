import {SubscriptionIOS} from 'react-native-iap';

export enum BillingInterval {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

type PriceInfo = {
  currency: string; // e.g. USD
  localizedPrice: string; // e.g. $48.00
  billingInterval?: BillingInterval;
};

export function formatPrice(priceInfo: PriceInfo): string {
  const {currency, localizedPrice, billingInterval} = priceInfo;

  const periodMap: Record<BillingInterval, string> = {
    [BillingInterval.MONTHLY]: 'Monthly',
    [BillingInterval.YEARLY]: 'Yearly',
  };

  const period =
    billingInterval === undefined ? '' : periodMap[billingInterval];

  return `${currency} ${localizedPrice} ${period}`;
}

export function getBillingInterval(
  subscriptionPeriodUnitIOS: SubscriptionIOS['subscriptionPeriodUnitIOS'],
) {
  switch (subscriptionPeriodUnitIOS) {
    case 'MONTH':
      return BillingInterval.MONTHLY;
    case 'YEAR':
      return BillingInterval.YEARLY;
    default:
      return;
  }
}
