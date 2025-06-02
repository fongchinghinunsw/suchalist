import TaskItemList from '@/components/task/TaskItemList/TaskItemList';
import { NewTask } from '@common/types/task';
import { selectCurrentList, tasksActions } from '@renderer/stores/tasks/tasks';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function HomePage() {
  const currentList = useSelector(selectCurrentList);

  const dispatch = useDispatch();

  const addTask = useCallback(
    (task: NewTask) => {
      dispatch(tasksActions.addTask(task));
    },
    [dispatch]
  );
  return (
    <main className="w-full px-2 py-3">
      <TaskItemList list={currentList} onAddTask={addTask} />
    </main>
  );
}
