import { Task } from '@common/types/task';
import { sortTasks } from '@common/utils/task/sort';
import TaskItem from '../TaskItem';

type Props = {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onStarTask: (task: Task, isStarred: boolean) => void;
  onToggleTaskIsCompleted: (task: Task, isCompleted: boolean) => void;
};

export default function TaskItemUngroupedList({
  tasks,
  onSelectTask,
  onStarTask,
  onToggleTaskIsCompleted
}: Props) {
  const sortedTasks = sortTasks(tasks);

  return (
    <div className="flex flex-col gap-2">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onSelectTask={onSelectTask}
          onStarTask={onStarTask}
          onToggleTaskIsCompleted={onToggleTaskIsCompleted}
        />
      ))}
    </div>
  );
}
