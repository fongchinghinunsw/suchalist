import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {getCurrentTasks} from '../utils/get_current_tasks';

export default function deleteTask(
  state: TasksState,
  action: PayloadAction<string>,
) {
  const currentTasks = getCurrentTasks(state);

  const index = currentTasks.findIndex(task => task.id === action.payload);

  currentTasks.splice(index, 1);
}
