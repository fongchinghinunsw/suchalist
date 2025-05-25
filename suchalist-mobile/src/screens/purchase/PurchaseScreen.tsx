import Text from '@/components/base/Text';
import SubscriptionGroup from '@/components/iap/SubscriptionGroup';
import {useIAPInit} from '@/hooks/iap/useIAPInit';
import {useProducts} from '@/hooks/iap/useProducts';
import {StyleSheet, View} from 'react-native';

const CREATOR_MESSAGES = [
  "We're a small team on a mission to build a TODO list app that's thoughtfully tailored and made just for you.",
  'As a small team, we value your support in creating a TODO list app designed specifically with you in mind.',
  "We're a small team and would love your support to build a TODO list app that's tailored to your needs.",
];

export default function PurchaseScreen() {
  const {isInitialized: isIAPInitialized} = useIAPInit();
  const {subscriptions, loading: isFetchingProducts} =
    useProducts(isIAPInitialized);

  if (isFetchingProducts) {
    return null;
  }

  const creatorMessage =
    CREATOR_MESSAGES[Math.floor(Math.random() * CREATOR_MESSAGES.length)];

  return (
    <View style={styles.container}>
      <Text>{creatorMessage}</Text>
      <SubscriptionGroup subscriptions={subscriptions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 5,
  },
});
