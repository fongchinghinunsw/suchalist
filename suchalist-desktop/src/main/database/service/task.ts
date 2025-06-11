import { Task } from '@common/types/task';
import { getTaskRowsByListId, insertTaskRow, updateTaskRowIsStarred } from '../repository/task';
import { TaskRow, toTask } from '../types/task';
import { normalize } from '../utils/normalize';

export function getTasksByListId(id: string): Task[] {
  const taskRows = getTaskRowsByListId(id);
  return taskRows.map((row) => toTask(row));
}

export function insertTask(task: Task) {
  const taskRow = normalize<Task, TaskRow>(task);
  insertTaskRow(taskRow);
}

export function updateTaskIsCompleted(id: string, isCompleted: boolean) {
  return updateTaskIsCompleted(id, isCompleted);
}

export function updateTaskIsStarred(id: string, isStarred: boolean) {
  return updateTaskRowIsStarred(id, isStarred);
}
