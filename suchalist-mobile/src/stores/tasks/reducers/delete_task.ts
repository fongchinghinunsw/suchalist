import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {getCurrentTasksFromListMap} from '../utils/get_task';
import {getListFromResources} from '../utils/get_list';

export default function deleteTask(
  state: TasksState,
  action: PayloadAction<string>,
) {
  const taskId = action.payload;

  const currentTasks = getCurrentTasksFromListMap(state);

  const index = currentTasks.findIndex(task => task.id === taskId);

  currentTasks.splice(index, 1);

  store(state, taskId);
}

function store(state: TasksState, taskId: string) {
  const result = getListFromResources(state.currentTaskListId, state.resources);
  if (result) {
    result.list.tasks = result.list.tasks.filter(task => task.id !== taskId);
  }
}
