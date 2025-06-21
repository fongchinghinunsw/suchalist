import { db } from '@/database/db';
import { TaskRow } from '@/database/types/task';

export function getTaskRowsByListId(id: string): TaskRow[] {
  return db.prepare<string, TaskRow>('SELECT * FROM tasks WHERE listId = ?').all(id);
}
