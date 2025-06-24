import TaskItemList from '@/components/task/TaskItemList/TaskItemList';
import { Task, TaskWithEditableFields } from '@common/types/task';
import { selectCurrentList, tasksActions } from '@renderer/stores/tasks/tasks';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskDetails from './components/TaskDetails';

export default function HomePage() {
  const currentList = useSelector(selectCurrentList);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const dispatch = useDispatch();

  const onAddTask = useCallback(
    (task: TaskWithEditableFields) => {
      dispatch(tasksActions.addTask(task));
    },
    [dispatch]
  );

  const onDeleteTask = (task: Task) => {
    setCurrentTask(null);
    dispatch(tasksActions.deleteTask({ task }));
  };

  const onSelectTask = (task: Task) => setCurrentTask(task);

  return (
    <main className="px-2 py-3 flex-1 flex flex-row gap-4">
      {currentList && (
        <TaskItemList list={currentList} onAddTask={onAddTask} onSelectTask={onSelectTask} />
      )}
      {currentTask && (
        <TaskDetails key={currentTask.id} task={currentTask} onDeleteTask={onDeleteTask} />
      )}
    </main>
  );
}
