import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../../tasks';
import {getCurrentTasksFromListMap} from '../../utils/get_task';
import {getListFromResources} from '../../utils/get_list';
import {getTaskIndex} from '../../utils/get_task';
import {Task} from '@/services/task-service/types';
import {STARRED_LIST_ID, TODAY_LIST_ID} from '@/services/task-service/fake/id';
import {getToday, isDueToday} from '../../utils/utils';

export default function setIsCompleted(
  state: TasksState,
  action: PayloadAction<{
    task: Task;
    isCompleted: boolean;
  }>,
) {
  const {task, isCompleted} = action.payload;
  const listId = task.taskListId;
  const taskId = task.id;

  console.log({listId, taskId, isCompleted});

  const tasksFromListMap = getCurrentTasksFromListMap(state, listId);

  const now = new Date().toISOString();
  const index = getTaskIndex(tasksFromListMap, taskId);

  if (index !== -1) {
    const newTask: Task = {
      ...tasksFromListMap[index],
      isCompleted,
      completedAt: isCompleted ? now : undefined,
    };

    tasksFromListMap[index] = newTask;

    updateGeneratedList(state, newTask);

    store(state, listId, taskId, isCompleted, now);
  }
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
      state.listMap[TODAY_LIST_ID].tasks[index] = newTask;
    }
  }
}

function store(
  state: TasksState,
  listId: string,
  taskId: string,
  isCompleted: boolean,
  now: string,
) {
  const result = getListFromResources(listId, state.resources);
  if (result !== undefined) {
    const taskFromResources = result.list.tasks.find(t => t.id === taskId);
    if (taskFromResources) {
      taskFromResources.isCompleted = isCompleted;
      taskFromResources.completedAt = isCompleted ? now : undefined;
    }
  }
}
