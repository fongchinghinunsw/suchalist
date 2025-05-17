import {Task} from '@/services/task-service/types';
import {PayloadAction} from '@reduxjs/toolkit';
import {TasksState} from '../tasks';
import {NewTask} from '../types';
import {getId} from '../utils/utils';
import getCurrentTasksFromListMap from '../utils/get_current_tasks';
import {getListFromResources} from '../utils/get_list';

export default function addTask(
  state: TasksState,
  action: PayloadAction<NewTask>,
) {
  const currentTasks = getCurrentTasksFromListMap(state);

  const taskId = getId();

  const now = new Date().toISOString();
  const newTask: Task = {
    ...action.payload,
    id: taskId,
    taskListId: state.currentTaskListId,
    isCompleted: false,
    isStarred: false,
    createdAt: now,
    updatedAt: now,
  };

  const index = currentTasks.findIndex(task => {
    if (newTask.dueDate == null) {
      return task.dueDate !== undefined;
    } else {
      if (task.dueDate == null) {
        return false;
      }

      return (
        new Date(task.dueDate).getTime() > new Date(newTask.dueDate).getTime()
      );
    }
  });
  currentTasks.splice(index === -1 ? 0 : index, 0, newTask);

  store(state, state.currentTaskListId, newTask);
}

function store(state: TasksState, listId: string, newTask: Task) {
  const result = getListFromResources(listId, state.resources);
  if (result !== undefined) {
    result.list.tasks.push(newTask);
  }
}
