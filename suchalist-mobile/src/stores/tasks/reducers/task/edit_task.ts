import {STARRED_LIST_ID, TODAY_LIST_ID} from '@/services/task-service/fake/id';
import {Task} from '@/services/task-service/types';
import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../../tasks';
import {EditTask} from '../../types';
import {getListFromResources} from '../../utils/get_list';
import {getCurrentTasksFromListMap} from '../../utils/get_task';
import {isDueToday} from '../../utils/utils';

export default function editTask(
  state: TasksState,
  action: PayloadAction<{
    task: Task;
    editTask: EditTask;
  }>,
) {
  const task = action.payload.task;
  const {taskListId: listId, id: taskId} = task;

  const currentTasks = getCurrentTasksFromListMap(state, listId);

  const now = new Date().toISOString();

  const index = currentTasks.findIndex(t => t.id === taskId);

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

  updateGeneratedList(state, task, newTask);

  store(state, listId, taskId, newTask);
}

function updateGeneratedList(state: TasksState, oldTask: Task, newTask: Task) {
  if (newTask.isStarred) {
    const index = state.listMap[STARRED_LIST_ID].tasks.findIndex(
      t => t.id === newTask.id,
    );
    if (index !== -1) {
      state.listMap[STARRED_LIST_ID].tasks[index] = newTask;
    }
  }

  const isOldTaskDueToday = isDueToday(oldTask);
  const isNewTaskDueToday = isDueToday(newTask);
  if (isOldTaskDueToday && isNewTaskDueToday) {
    const index = state.listMap[TODAY_LIST_ID].tasks.findIndex(
      t => t.id === newTask.id,
    );

    if (index !== -1) {
      state.listMap[TODAY_LIST_ID].tasks[index] = newTask;
    }
  } else if (isOldTaskDueToday) {
    // the new task is not due today anymore, remove the old task from the list
    const index = state.listMap[TODAY_LIST_ID].tasks.findIndex(
      t => t.id === newTask.id,
    );

    if (index !== -1) {
      state.listMap[TODAY_LIST_ID].tasks.splice(index, 1);
    }
  } else if (isNewTaskDueToday) {
    // the new task is due today, add to the list
    state.listMap[TODAY_LIST_ID].tasks.push(newTask);
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
