import {
  NEXT_SEVEN_DAYS_LIST_ID,
  STARRED_LIST_ID,
  TODAY_LIST_ID,
} from '@/services/task-service/fake/id';
import {Task} from '@/services/task-service/types';
import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../../tasks';
import {getListFromResources} from '../../utils/get_list';
import {getCurrentTasksFromListMap} from '../../utils/get_task';
import {isDueToday, isDueWithin7Days} from '../../utils/utils';

export default function deleteTask(
  state: TasksState,
  action: PayloadAction<{
    task: Task;
  }>,
) {
  const task = action.payload.task;
  const {taskListId: listId, id: taskId} = task;

  const currentTasks = getCurrentTasksFromListMap(state, listId);

  const index = currentTasks.findIndex(t => t.id === taskId);

  currentTasks.splice(index, 1);

  updateGeneratedList(state, task);

  store(state, listId, taskId);
}

function updateGeneratedList(state: TasksState, task: Task) {
  if (task.isStarred) {
    const index = state.listMap[STARRED_LIST_ID].tasks.findIndex(
      t => t.id === task.id,
    );
    if (index !== -1) {
      state.listMap[STARRED_LIST_ID].tasks.splice(index, 1);
    }
  }

  if (isDueToday(task)) {
    const index = state.listMap[TODAY_LIST_ID].tasks.findIndex(
      t => t.id === task.id,
    );

    if (index !== -1) {
      state.listMap[TODAY_LIST_ID].tasks.splice(index, 1);
    }
  }

  if (isDueWithin7Days(task)) {
    const index = state.listMap[NEXT_SEVEN_DAYS_LIST_ID].tasks.findIndex(
      t => t.id === task.id,
    );

    if (index !== -1) {
      state.listMap[NEXT_SEVEN_DAYS_LIST_ID].tasks.splice(index, 1);
    }
  }
}

function store(state: TasksState, listId: string, taskId: string) {
  const result = getListFromResources(listId, state.resources);
  if (result) {
    result.list.tasks = result.list.tasks.filter(task => task.id !== taskId);
  }
}
