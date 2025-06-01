import { Task } from '@common/types/task';
import { sortTasks } from '@common/utils/task/sort';
import TaskItem from '../TaskItem';

type Props = {
  tasks: Task[];
};

export default function TaskItemUngroupedList({ tasks }: Props) {
  const sortedTasks = sortTasks(tasks);

  return (
    <div className="flex flex-col gap-2">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
