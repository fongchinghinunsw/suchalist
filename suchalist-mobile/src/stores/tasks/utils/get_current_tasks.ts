import {Task} from '@/services/task-service/types';
import {TasksState} from '../tasks';

export function getCurrentTasks(state: TasksState): Task[] {
  return state.listMap[state.currentTaskListId].tasks;
}
