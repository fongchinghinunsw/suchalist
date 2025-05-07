import Text from '@/components/base/Text';
import {TaskList} from '@/stores/tasks/types';
import Icon from '@react-native-vector-icons/ionicons';
import {Pressable, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {
  taskList: TaskList;
  onPress: (taskListId: string) => void;
};

export default function TaskListItem({taskList: {id, title}, onPress}: Props) {
  return (
    <Animated.View>
      <Pressable style={styles.container} onPress={() => onPress(id)}>
        <Icon name="list-outline" size={16} />
        <Text size="large">{title}</Text>
      </Pressable>
    </Animated.View>
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
