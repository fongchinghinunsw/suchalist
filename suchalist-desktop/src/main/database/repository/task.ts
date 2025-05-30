import { TaskRow } from '@/database/types/task';
import { db } from '../init';

export function getTaskByListId(id: string): TaskRow[] {
  const tasks = db.prepare<string, TaskRow>('SELECT * FROM tasks WHERE listId = ?').all(id);
  return tasks;
}
