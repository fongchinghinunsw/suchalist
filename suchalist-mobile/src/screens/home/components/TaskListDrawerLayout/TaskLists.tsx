import {TaskList} from '@/stores/tasks/types';
import {Text} from 'react-native';

type Props = {
  taskLists: TaskList[];
};

export default function TaskLists({taskLists}: Props) {
  return taskLists.map(taskList => {
    return <Text key={taskList.id}>{taskList.title}</Text>;
  });
}
