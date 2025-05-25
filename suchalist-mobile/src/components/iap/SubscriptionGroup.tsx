import {getColor} from '@/constants/styles';
import {selectTheme, Theme} from '@/stores/theme';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import Text from '../base/Text';
import SubscriptionProduct from './subscription_product/SubscriptionProduct';
import {SubscriptionAndroid, SubscriptionIOS} from 'react-native-iap';

type Props = {
  subscriptions: (SubscriptionAndroid | SubscriptionIOS)[];
};

export default function SubscriptionGroup({subscriptions}: Props) {
  const theme = useSelector(selectTheme);
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text size="xxlarge" style={styles.title}>
          Suchalist Pro
        </Text>
        <View style={styles.title}>
          <Text>📂 Unlimited folders, lists and subtasks</Text>
          <Text>
            ✨ Additional app color themes and backgrounds, plus custom
            backgrounds uploaded from device
          </Text>
        </View>
      </View>
      <View style={styles.plansContainer}>
        {subscriptions.map(subscription => {
          return (
            <SubscriptionProduct
              key={subscription.productId}
              product={subscription}
            />
          );
        })}
      </View>
    </View>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      borderWidth: 2,
      borderColor: getColor(theme, 200),
      borderRadius: 10,
      padding: 20,
      gap: 20,
    },
    descriptionContainer: {
      gap: 10,
    },
    title: {
      alignSelf: 'center',
    },
    plansContainer: {
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 10,
    },
  });
};
