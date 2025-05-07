import {TaskList} from '@/stores/tasks/types';
import TaskListItem from './TaskListItem';

type Props = {
  taskLists: TaskList[];
  onPress: (taskListId: string) => void;
};

export default function TaskLists({taskLists, onPress}: Props) {
  return taskLists.map(taskList => {
    return (
      <TaskListItem key={taskList.id} taskList={taskList} onPress={onPress} />
    );
  });
}
