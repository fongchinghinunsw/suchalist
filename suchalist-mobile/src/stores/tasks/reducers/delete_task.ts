import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';

export default function deleteTask(
  state: TasksState,
  action: PayloadAction<string>,
) {
  const currentTasks = state.listMap[state.currentTaskListId].tasks;

  const index = currentTasks.findIndex(task => task.id === action.payload);

  currentTasks.splice(index, 1);
}
