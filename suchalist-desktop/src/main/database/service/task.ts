import { Task } from '@common/types/task';
import { getTaskRowsByListId, insertTaskRow } from '../repository/task';
import { TaskRow, TaskSchema } from '../types/task';
import { normalize } from '../utils/normalize';

export function getTasksByListId(id: string): Task[] {
  const taskRows = getTaskRowsByListId(id);
  return taskRows.map((row) => TaskSchema.parse(row));
}

export function insertTask(task: Task) {
  const taskRow = normalize<Task, TaskRow>(task);
  insertTaskRow(taskRow);
}
