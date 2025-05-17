import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {getCurrentTasksFromListMap} from '../utils/get_task';
import {getListFromResources} from '../utils/get_list';

export default function deleteTask(
  state: TasksState,
  action: PayloadAction<{
    listId: string;
    taskId: string;
  }>,
) {
  const {listId, taskId} = action.payload;

  const currentTasks = getCurrentTasksFromListMap(state);

  const index = currentTasks.findIndex(task => task.id === taskId);

  currentTasks.splice(index, 1);

  store(state, listId, taskId);
}

function store(state: TasksState, listId: string, taskId: string) {
  const result = getListFromResources(listId, state.resources);
  if (result) {
    result.list.tasks = result.list.tasks.filter(task => task.id !== taskId);
  }
}
