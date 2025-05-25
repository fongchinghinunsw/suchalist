import React from 'react';
import {View} from 'react-native';
import {SubscriptionAndroid} from 'react-native-iap';

type Props = {
  product: SubscriptionAndroid;
  subscribe: (sku: string, offerToken?: string) => Promise<void>;
};

export default function GoogleSubscriptionProduct({product}: Props) {
  console.log({product});

  return (
    <View>
      {/* <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      {product.subscriptionOfferDetails?.map((offer, index) => (
        <View key={offer.basePlanId + index} style={styles.offerCard}>
          <Text style={styles.offerTitle}>Base Plan: {offer.basePlanId}</Text>
          <Text style={styles.offerPrice}>
            Price:{' '}
            {offer.pricingPhases.pricingPhaseList[0].formattedPrice ?? 'N/A'}
          </Text>
          <Pressable
            style={({pressed}) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => subscribe(product.productId, offer.offerToken)}>
            <Text style={styles.buttonText}>Subscribe</Text>
          </Pressable>
        </View>
      ))} */}
    </View>
  );
}
