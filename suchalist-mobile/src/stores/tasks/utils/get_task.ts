import {Task} from '@/services/task-service/types';
import {TasksState} from '../tasks';

export function getTask(tasks: Task[], taskId: string) {
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    return tasks[index];
  }
}

export function getCurrentTasksFromListMap(
  state: TasksState,
  listId: string,
): Task[] {
  return state.listMap[listId].tasks;
}
