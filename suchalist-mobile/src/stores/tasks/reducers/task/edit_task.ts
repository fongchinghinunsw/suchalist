import {Task} from '@/services/task-service/types';
import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../../tasks';
import {EditTask} from '../../types';
import {getListFromResources} from '../../utils/get_list';
import {getCurrentTasksFromListMap} from '../../utils/get_task';
import {STARRED_LIST_ID, TODAY_LIST_ID} from '@/services/task-service/fake/id';
import {getToday, isDueToday} from '../../utils/utils';

export default function editTask(
  state: TasksState,
  action: PayloadAction<{
    listId: string;
    taskId: string;
    editTask: EditTask;
  }>,
) {
  const {listId, taskId} = action.payload;
  const currentTasks = getCurrentTasksFromListMap(state, listId);

  const now = new Date().toISOString();

  const index = currentTasks.findIndex(task => task.id === taskId);

  console.log('editing task', {
    ...currentTasks[index],
    ...action.payload.editTask,
  });

  const newTask = {
    ...currentTasks[index],
    ...action.payload.editTask,
    updatedAt: now,
  };

  currentTasks[index] = newTask;

  updateGeneratedList(state, newTask);

  store(state, listId, taskId, newTask);
}

function updateGeneratedList(state: TasksState, newTask: Task) {
  if (newTask.isStarred) {
    const index = state.listMap[STARRED_LIST_ID].tasks.findIndex(
      t => t.id === newTask.id,
    );
    if (index !== -1) {
      state.listMap[STARRED_LIST_ID].tasks[index] = newTask;
    }
  }

  if (isDueToday(newTask, getToday())) {
    const index = state.listMap[TODAY_LIST_ID].tasks.findIndex(
      t => t.id === newTask.id,
    );

    if (index !== -1) {
      state.listMap[TODAY_LIST_ID].tasks.splice(index, 1);
    }
  }
}

function store(
  state: TasksState,
  listId: string,
  taskId: string,
  updatedTask: Task,
) {
  const result = getListFromResources(listId, state.resources);
  if (result) {
    const index = result.list.tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      result.list.tasks[index] = updatedTask;
    }
  }
}
