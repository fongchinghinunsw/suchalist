import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../../tasks';
import {getCurrentTasksFromListMap} from '../../utils/get_task';
import {getListFromResources} from '../../utils/get_list';
import {getTaskIndex} from '../../utils/get_task';
import {Task} from '@/services/task-service/types';
import {STARRED_LIST_ID, TODAY_LIST_ID} from '@/services/task-service/fake/id';
import {getToday, isDueToday} from '../../utils/utils';

export default function setIsStarred(
  state: TasksState,
  action: PayloadAction<{
    task: Task;
    isStarred: boolean;
  }>,
) {
  const {task, isStarred} = action.payload;
  const listId = task.taskListId;
  const taskId = task.id;

  const currentTasks = getCurrentTasksFromListMap(state, listId);

  const index = getTaskIndex(currentTasks, taskId);
  if (index !== -1) {
    const newTask = {
      ...currentTasks[index],
      isStarred,
    };

    currentTasks[index] = newTask;

    updateGeneratedList(state, newTask);

    store(state, listId, taskId, isStarred);
  }
}

function updateGeneratedList(state: TasksState, newTask: Task) {
  if (newTask.isStarred) {
    state.listMap[STARRED_LIST_ID].tasks.push(newTask);
  } else {
    state.listMap[STARRED_LIST_ID].tasks = state.listMap[
      STARRED_LIST_ID
    ].tasks.filter(task => task.id !== newTask.id);
  }

  if (isDueToday(newTask, getToday())) {
    const index = state.listMap[TODAY_LIST_ID].tasks.findIndex(
      t => t.id === newTask.id,
    );

    if (index !== -1) {
      state.listMap[TODAY_LIST_ID].tasks[index] = newTask;
    }
  }
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
