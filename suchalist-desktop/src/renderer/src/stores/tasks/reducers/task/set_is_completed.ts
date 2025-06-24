import { NEXT_SEVEN_DAYS_LIST_ID, STARRED_LIST_ID, TODAY_LIST_ID } from '@common/constants/list';
import { Task } from '@common/types/task';
import { PayloadAction } from '@reduxjs/toolkit';
import { TasksState } from '../../tasks';
import { getListFromResources } from '../../utils/get_list';
import { getCurrentTasksFromListMap, getTaskIndex } from '../../utils/get_task';
import { isDueToday, isDueWithin7Days } from '../../utils/utils';

export default function setIsCompleted(
  state: TasksState,
  action: PayloadAction<{
    task: Task;
    isCompleted: boolean;
  }>
) {
  // UPDATE REDUX STORE
  const { task, isCompleted } = action.payload;
  const listId = task.listId;
  const taskId = task.id;

  const tasksFromListMap = getCurrentTasksFromListMap(state, listId);

  const now = new Date().toISOString();
  const index = getTaskIndex(tasksFromListMap, taskId);

  if (index !== -1) {
    const newTask: Task = {
      ...tasksFromListMap[index],
      isCompleted,
      completedAt: isCompleted ? now : undefined
    };

    tasksFromListMap[index] = newTask;

    updateGeneratedList(state, newTask);

    const result = getListFromResources(listId, state.resources);
    if (result !== undefined) {
      const taskFromResources = result.list.tasks.find((t) => t.id === taskId);
      if (taskFromResources) {
        taskFromResources.isCompleted = isCompleted;
        taskFromResources.completedAt = isCompleted ? now : undefined;
      }
    }

    window.database.updateTaskIsCompleted(task.id, !task.isCompleted);
  }
}

function updateGeneratedList(state: TasksState, newTask: Task) {
  if (newTask.isStarred) {
    const index = state.listMap[STARRED_LIST_ID].tasks.findIndex((t) => t.id === newTask.id);
    if (index !== -1) {
      state.listMap[STARRED_LIST_ID].tasks[index] = newTask;
    }
  }

  if (isDueToday(newTask)) {
    const index = state.listMap[TODAY_LIST_ID].tasks.findIndex((t) => t.id === newTask.id);

    if (index !== -1) {
      state.listMap[TODAY_LIST_ID].tasks[index] = newTask;
    }
  }

  if (isDueWithin7Days(newTask)) {
    const index = state.listMap[NEXT_SEVEN_DAYS_LIST_ID].tasks.findIndex(
      (t) => t.id === newTask.id
    );

    if (index !== -1) {
      state.listMap[NEXT_SEVEN_DAYS_LIST_ID].tasks[index] = newTask;
    }
  }
}
