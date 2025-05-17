import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';

export default function setIsCompleted(
  state: TasksState,
  action: PayloadAction<{
    id: string;
    isCompleted: boolean;
  }>,
) {
  const currentTasks = state.listMap[state.currentTaskListId].tasks;

  const index = currentTasks.findIndex(task => task.id === action.payload.id);
  if (index !== -1) {
    currentTasks[index].isCompleted = action.payload.isCompleted;

    // const tasks = mayBeCreateNextNRecurringTasks(
    //   state.tasks[index],
    //   state.tasks.slice(index + 1),
    //   4,
    // );
    // state.tasks.push(...tasks);
    currentTasks.sort();
    // console.log('setIsCompleted', state.tasks);
  }
}
