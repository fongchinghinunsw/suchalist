import { List } from '@common/types/list';
import {
  CompletedTask,
  isCompletedTask,
  isTaskWithDueDate,
  Task,
  TaskWithDueDate
} from '@common/types/task';
import Spacer from '@renderer/components/base/Spacer';
import { tasksActions } from '@renderer/stores/tasks/tasks';
import { useDispatch } from 'react-redux';
import AddTaskItem from './internal/AddTaskItem';
import CompletedTaskItemList from './internal/lists/CompletedTaskItemList';
import TaskItemGroupedList from './internal/lists/TaskItemGroupedList';
import TaskItemUngroupedList from './internal/lists/TaskItemUngroupedList';

type Props = {
  list: List;
  showAddTaskItem?: boolean;
  onAddTask: (task: { title: string }) => void;
  onSelectTask: (task: Task) => void;
};

export default function TaskItemList({
  list,
  showAddTaskItem = true,
  onAddTask,
  onSelectTask
}: Props) {
  const dispatch = useDispatch();

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

  const onStarTask = (task: Task, isStarred: boolean) => {
    dispatch(tasksActions.setIsStarred({ task, isStarred }));
  };

  const onToggleTaskIsCompleted = (task: Task, isCompleted: boolean) => {
    dispatch(tasksActions.setIsCompleted({ task, isCompleted }));
  };

  return (
    <section className="w-full">
      {showAddTaskItem && <AddTaskItem onAddTask={onAddTask} />}
      <Spacer size={2} />
      <TaskItemUngroupedList
        tasks={tasksWithoutDueDate}
        onSelectTask={onSelectTask}
        onStarTask={onStarTask}
        onToggleTaskIsCompleted={onToggleTaskIsCompleted}
      />
      <TaskItemGroupedList
        tasks={tasksWithDueDate}
        onSelectTask={onSelectTask}
        onStarTask={onStarTask}
        onToggleTaskIsCompleted={onToggleTaskIsCompleted}
      />
      <CompletedTaskItemList
        tasks={completedTasks}
        onSelectTask={onSelectTask}
        onStarTask={onStarTask}
        onToggleTaskIsCompleted={onToggleTaskIsCompleted}
      />
    </section>
  );
}
