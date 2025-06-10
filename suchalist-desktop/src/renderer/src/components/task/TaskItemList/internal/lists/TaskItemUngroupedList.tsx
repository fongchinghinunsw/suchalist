import { Task } from '@common/types/task';
import { sortTasks } from '@common/utils/task/sort';
import TaskItem from '../TaskItem';

type Props = {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
};

export default function TaskItemUngroupedList({ tasks, onSelectTask }: Props) {
  const sortedTasks = sortTasks(tasks);

  return (
    <div className="flex flex-col gap-2">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} onSelectTask={onSelectTask} />
      ))}
    </div>
  );
}
