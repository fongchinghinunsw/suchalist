import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {getCurrentTasksFromListMap} from '../utils/get_task';
import {getListFromResources} from '../utils/get_list';
import {getTask} from '../utils/get_task';

export default function setIsCompleted(
  state: TasksState,
  action: PayloadAction<{
    listId: string;
    taskId: string;
    isCompleted: boolean;
  }>,
) {
  const {listId, taskId, isCompleted} = action.payload;

  const currentTasks = getCurrentTasksFromListMap(state, listId);

  const task = getTask(currentTasks, taskId);
  if (task !== undefined) {
    task.isCompleted = isCompleted;
  }

  store(state, listId, taskId, isCompleted);
}

function store(
  state: TasksState,
  listId: string,
  taskId: string,
  isCompleted: boolean,
) {
  const result = getListFromResources(listId, state.resources);
  if (result !== undefined) {
    const taskFromResources = result.list.tasks.find(t => t.id === taskId);
    if (taskFromResources) {
      taskFromResources.isCompleted = isCompleted;
    }
  }
}
