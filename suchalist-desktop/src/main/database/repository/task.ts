import { TaskRow } from '@/database/types/task';
import { db } from '../init';

export function getTaskRowsByListId(id: string): TaskRow[] {
  const tasks = db.prepare<string, TaskRow>('SELECT * FROM tasks WHERE listId = ?').all(id);
  return tasks;
}
