import Text from '@/components/base/Text';
import Icon from '@react-native-vector-icons/ionicons';
import {ComponentProps, ReactNode} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

type Props = {
  icon: ComponentProps<typeof Icon>['name'];
  title: string;
  rightSection: ReactNode;
  onPress: () => void;
  onLongPress: (() => void) | undefined;
};

export default function BaseHeaderItem({
  icon,
  title,
  rightSection,
  onPress,
  onLongPress,
}: Props) {
  return (
    <Pressable
      style={styles.container}
      delayLongPress={250}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View style={styles.leftSection}>
        <Icon name={icon} size={16} />
        <Text size="large">{title}</Text>
      </View>
      {rightSection}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
