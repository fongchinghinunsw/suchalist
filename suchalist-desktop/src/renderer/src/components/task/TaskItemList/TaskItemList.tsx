import { List } from '@common/types/list';
import {
  CompletedTask,
  isCompletedTask,
  isTaskWithDueDate,
  Task,
  TaskWithDueDate
} from '@common/types/task';
import TaskItemUngroupedList from './internal/lists/TaskItemUngroupedList';

type Props = {
  list: List;
};

export default function TaskItemList({ list }: Props) {
  const completedTasks: CompletedTask[] = [];
  const tasksWithoutDueDate: Task[] = [];
  const tasksWithDueDate: TaskWithDueDate[] = [];

  list.tasks.forEach((task) => {
    if (isCompletedTask(task)) {
      completedTasks.push(task);
      return;
    }

    if (isTaskWithDueDate(task)) {
      tasksWithDueDate.push(task);
      return;
    }

    tasksWithoutDueDate.push(task);
  });

  tasksWithDueDate.sort(
    (l1, l2) => new Date(l1.dueDate).getTime() - new Date(l2.dueDate).getTime()
  );

  completedTasks.sort(
    (l1, l2) => new Date(l2.completedAt).getTime() - new Date(l1.completedAt).getTime()
  );

  return (
    <section className="w-full">
      <TaskItemUngroupedList tasks={tasksWithoutDueDate} />
    </section>
  );
}
