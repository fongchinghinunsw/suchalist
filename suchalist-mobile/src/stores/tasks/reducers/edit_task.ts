import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {EditTask} from '../types';
import {getCurrentTasks} from '../utils/get_current_tasks';

export default function editTask(
  state: TasksState,
  action: PayloadAction<{
    id: string;
    task: EditTask;
  }>,
) {
  const currentTasks = getCurrentTasks(state);

  const now = new Date().toISOString();

  const index = currentTasks.findIndex(task => task.id === action.payload.id);

  console.log('editing task', {
    ...currentTasks[index],
    ...action.payload.task,
  });

  currentTasks[index] = {
    ...currentTasks[index],
    ...action.payload.task,
    updatedAt: now,
    // recurrence:
    //   recurrence === undefined
    //     ? undefined
    //     : {
    //         ...recurrence,
    //         originalParentId: state.tasks[index].id,
    //       },
  };
}
