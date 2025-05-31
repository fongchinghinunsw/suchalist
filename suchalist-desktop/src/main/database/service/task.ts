import { Task } from '@common/types/task';
import { getTaskRowsByListId } from '../repository/task';
import { TaskRowSchema } from '../types/task';

export function getTasksByListId(id: string): Task[] {
  const taskRows = getTaskRowsByListId(id);
  return taskRows.map((row) => TaskRowSchema.parse(row));
}
