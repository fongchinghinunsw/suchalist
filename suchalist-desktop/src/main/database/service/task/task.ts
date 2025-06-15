import { Task } from '@common/types/task';
import {
  getTaskRowsByListId,
  updateTaskRowIsCompleted,
  updateTaskRowIsStarred
} from '../../repository/task';
import { toTask } from '../../types/task';

export function getTasksByListId(id: string): Task[] {
  const taskRows = getTaskRowsByListId(id);
  return taskRows.map((row) => toTask(row));
}

export function updateTaskIsCompleted(id: string, isCompleted: boolean) {
  return updateTaskRowIsCompleted(id, isCompleted);
}

export function updateTaskIsStarred(id: string, isStarred: boolean) {
  return updateTaskRowIsStarred(id, isStarred);
}
