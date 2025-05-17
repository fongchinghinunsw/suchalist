import {Task} from '@/services/task-service/types';
import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {EditTask} from '../types';
import {getListFromResources} from '../utils/get_list';
import {getCurrentTasksFromListMap} from '../utils/get_task';

export default function editTask(
  state: TasksState,
  action: PayloadAction<{
    id: string;
    task: EditTask;
  }>,
) {
  const taskId = action.payload.id;
  const currentTasks = getCurrentTasksFromListMap(state);

  const now = new Date().toISOString();

  const index = currentTasks.findIndex(task => task.id === taskId);

  console.log('editing task', {
    ...currentTasks[index],
    ...action.payload.task,
  });

  const newTask = {
    ...currentTasks[index],
    ...action.payload.task,
    updatedAt: now,
  };

  currentTasks[index] = newTask;

  store(state, taskId, newTask);
}

function store(state: TasksState, taskId: string, updatedTask: Task) {
  const result = getListFromResources(state.currentTaskListId, state.resources);
  if (result) {
    const index = result.list.tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      result.list.tasks[index] = updatedTask;
    }
  }
}
