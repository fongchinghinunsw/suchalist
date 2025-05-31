import { TaskRow } from '@/database/types/task';
import { db } from '../init';

export function getTaskRowsByListId(id: string): TaskRow[] {
  return db.prepare<string, TaskRow>('SELECT * FROM tasks WHERE listId = ?').all(id);
}
