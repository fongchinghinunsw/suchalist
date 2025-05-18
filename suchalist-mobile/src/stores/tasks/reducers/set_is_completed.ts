import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {getCurrentTasksFromListMap} from '../utils/get_task';
import {getListFromResources} from '../utils/get_list';
import {getTaskIndex} from '../utils/get_task';
import {Task} from '@/services/task-service/types';
import {STARRED_LIST_ID} from '@/services/task-service/fake/id';

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

    updateGeneratedList(state, task, isCompleted, now);

    store(state, listId, taskId, isCompleted, now);
  }
}

function updateGeneratedList(
  state: TasksState,
  task: Task,
  isCompleted: boolean,
  now: string,
) {
  if (task.isStarred) {
    console.log(
      'updateGeneratedList',
      state.currentTaskListId,
      task.title,
      isCompleted,
    );
    const index = state.listMap[STARRED_LIST_ID].tasks.findIndex(t => t.id);
    if (index !== -1) {
      const t = state.listMap[STARRED_LIST_ID].tasks[index];
      t.isCompleted = isCompleted;
      t.completedAt = now;
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
