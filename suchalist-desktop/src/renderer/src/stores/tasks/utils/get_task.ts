import { Task } from '@common/types/task';
import { TasksState } from '../tasks';

export function getTaskIndex(tasks: Task[], taskId: string) {
  return tasks.findIndex((task) => task.id === taskId);
}

export function getCurrentTasksFromListMap(state: TasksState, listId: string): Task[] {
  return state.listMap[listId].tasks;
}
