import TaskItemList from '@/components/task/TaskItemList/TaskItemList';
import { NewTask } from '@common/types/task';
import { selectCurrentList, tasksActions } from '@renderer/stores/tasks/tasks';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function HomePage() {
  const currentList = useSelector(selectCurrentList);
  console.log({ currentList });

  const dispatch = useDispatch();

  const addTask = useCallback(
    (task: NewTask) => {
      dispatch(tasksActions.addTask(task));
    },
    [dispatch]
  );
  return (
    <main className="px-2 py-3 flex-1">
      {currentList && <TaskItemList list={currentList} onAddTask={addTask} />}
    </main>
  );
}
