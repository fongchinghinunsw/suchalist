import {TaskList} from '@/stores/tasks/types';
import TaskListItem from './TaskListItem';

type Props = {
  taskLists: TaskList[];
};

export default function TaskLists({taskLists}: Props) {
  return taskLists.map(taskList => {
    return <TaskListItem key={taskList.id} taskList={taskList} />;
  });
}
