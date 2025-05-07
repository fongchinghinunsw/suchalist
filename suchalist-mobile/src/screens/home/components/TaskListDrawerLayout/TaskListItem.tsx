import Text from '@/components/base/Text';
import {TaskList} from '@/stores/tasks/types';
import Icon from '@react-native-vector-icons/ionicons';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {
  taskList: TaskList;
};

export default function TaskListItem({taskList: {title}}: Props) {
  return (
    <Animated.View style={styles.container}>
      <Icon name="list-outline" />
      <Text>{title}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
