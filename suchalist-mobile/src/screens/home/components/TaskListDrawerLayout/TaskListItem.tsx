import Text from '@/components/base/Text';
import Icon from '@react-native-vector-icons/ionicons';
import {Pressable, StyleSheet, View} from 'react-native';
import {ListHeader} from './types';

type Props = {
  listHeader: ListHeader;
  onPress: (taskListId: string) => void;
  onDrag: () => void;
};

export default function TaskListItem({
  listHeader: {id, title},
  onPress,
  onDrag,
}: Props) {
  return (
    <View>
      <Pressable
        style={styles.container}
        onPress={() => onPress(id)}
        onLongPress={onDrag}
        delayLongPress={250}>
        <Icon name="list-outline" size={16} />
        <Text size="large">{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },
});
