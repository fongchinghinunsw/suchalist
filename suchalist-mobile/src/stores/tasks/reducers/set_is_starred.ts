import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import getCurrentTasksFromListMap from '../utils/get_current_tasks';
import {getListFromResources} from '../utils/get_list';
import getTask from '../utils/get_task';

export default function setIsStarred(
  state: TasksState,
  action: PayloadAction<{
    listId: string;
    taskId: string;
    isStarred: boolean;
  }>,
) {
  const {listId, taskId, isStarred} = action.payload;

  const currentTasks = getCurrentTasksFromListMap(state);

  const task = getTask(currentTasks, taskId);
  if (task !== undefined) {
    task.isStarred = isStarred;
  }

  const list = getListFromResources(listId, state.resources);
  const taskFromResources = list?.tasks.find(t => t.id === taskId);
  if (taskFromResources) {
    taskFromResources.isStarred = isStarred;
  }
}
