import Button from '@/components/base/Button';
import {getColor} from '@/constants/styles';
import {selectTheme, Theme} from '@/stores/theme';
import {formatPrice, getBillingInterval} from '@/utils/currency/format';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SubscriptionIOS} from 'react-native-iap';
import {useSelector} from 'react-redux';

type Props = {
  product: SubscriptionIOS;
  subscribe: (productId: string) => Promise<void>;
};

export default function AppleSubscriptionProduct({product, subscribe}: Props) {
  const theme = useSelector(selectTheme);
  const styles = getStyles(theme);

  const price = formatPrice({
    currency: product.currency,
    localizedPrice: product.localizedPrice,
    billingInterval: getBillingInterval(product.subscriptionPeriodUnitIOS),
  });

  return (
    <View style={styles.container}>
      <Text>{price}</Text>
      <Button mode="contained" onPress={() => subscribe(product.productId)}>
        Choose
      </Button>
    </View>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      borderWidth: 2,
      borderColor: getColor(theme, 400),
      borderRadius: 10,
      padding: 20,
      gap: 20,
    },
  });
};
