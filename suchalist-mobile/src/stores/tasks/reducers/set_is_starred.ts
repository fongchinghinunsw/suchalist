import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {getCurrentTasksFromListMap} from '../utils/get_task';
import {getListFromResources} from '../utils/get_list';
import {getTaskIndex} from '../utils/get_task';

export default function setIsStarred(
  state: TasksState,
  action: PayloadAction<{
    listId: string;
    taskId: string;
    isStarred: boolean;
  }>,
) {
  const {listId, taskId, isStarred} = action.payload;

  const currentTasks = getCurrentTasksFromListMap(state, listId);

  const index = getTaskIndex(currentTasks, taskId);
  if (index !== -1) {
    currentTasks[index] = {
      ...currentTasks[index],
      isStarred,
    };
  }

  store(state, listId, taskId, isStarred);
}

function store(
  state: TasksState,
  listId: string,
  taskId: string,
  isStarred: boolean,
) {
  const result = getListFromResources(listId, state.resources);
  if (result !== undefined) {
    const taskFromResources = result.list.tasks.find(t => t.id === taskId);
    if (taskFromResources) {
      taskFromResources.isStarred = isStarred;
    }
  }
}
