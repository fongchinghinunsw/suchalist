import {Task} from '@/services/task-service/types';
import {TasksState} from '../tasks';

export default function getCurrentTasksFromListMap(state: TasksState): Task[] {
  return state.listMap[state.currentTaskListId].tasks;
}
