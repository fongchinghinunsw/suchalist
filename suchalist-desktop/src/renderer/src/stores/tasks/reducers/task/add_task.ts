import { NEXT_SEVEN_DAYS_LIST_ID, TODAY_LIST_ID } from '@common/constants/list';
import { Task, TaskWithEditableFields } from '@common/types/task';
import { getId } from '@common/utils/id';
import { PayloadAction } from '@reduxjs/toolkit';
import { TasksState } from '../../tasks';
import { getListFromResources } from '../../utils/get_list';
import { getCurrentTasksFromListMap } from '../../utils/get_task';
import { isDueToday, isDueWithin7Days } from '../../utils/utils';

export default function addTask(state: TasksState, action: PayloadAction<TaskWithEditableFields>) {
  // UPDATE REDUX STORE
  const currentTasks = getCurrentTasksFromListMap(state, state.currentTaskListId);

  const taskId = getId();

  const now = new Date().toISOString();
  const newTask: Task = {
    ...action.payload,
    id: taskId,
    listId: state.currentTaskListId,
    isCompleted: false,
    isStarred: false,
    createdAt: now,
    updatedAt: now
  };

  const index = currentTasks.findIndex((task) => {
    if (newTask.dueDate == null) {
      return task.dueDate !== undefined;
    } else {
      if (task.dueDate == null) {
        return false;
      }

      return new Date(task.dueDate).getTime() > new Date(newTask.dueDate).getTime();
    }
  });
  currentTasks.splice(index === -1 ? 0 : index, 0, newTask);

  updateGeneratedList(state, newTask);

  const result = getListFromResources(state.currentTaskListId, state.resources);
  if (result !== undefined) {
    result.list.tasks.push(newTask);
  }

  // PERSIST LOCALLY
  window.database.addTask(newTask);
}

function updateGeneratedList(state: TasksState, task: Task) {
  if (isDueToday(task)) {
    state.listMap[TODAY_LIST_ID].tasks.push(task);
  }

  if (isDueWithin7Days(task)) {
    state.listMap[NEXT_SEVEN_DAYS_LIST_ID].tasks.push(task);
  }
}
