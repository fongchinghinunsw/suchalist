import store from '@renderer/stores';
import { tasksActions } from '@renderer/stores/tasks/tasks';
import { getTasksState } from '@renderer/stores/tasks/utils/utils';
import { useEffect, useState } from 'react';

export default function useInit() {
  const [isLoading, setIsLoading] = useState(true);

  const initialize = async () => {
    try {
      const initialState = await getTasksState();
      store.dispatch(tasksActions.hydrate(initialState));
      console.log('hydrated');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return {
    isLoading
  };
}
