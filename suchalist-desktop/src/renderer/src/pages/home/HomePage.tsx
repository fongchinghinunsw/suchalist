import TaskItemList from '@/components/task/TaskItemList/TaskItemList';
import { isList } from '@common/types/list';
import { Resource } from '@common/types/resource';
import { NewTask } from '@common/types/task';
import { tasksActions } from '@renderer/stores/tasks/tasks';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function HomePage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const lists = resources.filter(isList);

  const dispatch = useDispatch();

  useEffect(() => {
    window.database.getResources().then((data) => {
      setResources(data);
    });
  }, []);

  const addTask = useCallback(
    (task: NewTask) => {
      dispatch(tasksActions.addTask(task));
    },
    [dispatch]
  );
  return (
    <main className="w-full px-2 py-3">
      {lists.length > 0 && <TaskItemList list={lists[0]} onAddTask={addTask} />}
    </main>
  );
}
