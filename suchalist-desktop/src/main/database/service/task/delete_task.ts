import { db } from '@/database/init';

export function deleteTask(id: string) {
  const stmt = db.prepare(`
        DELETE FROM tasks WHERE id = ?
      `);

  const result = stmt.run(id);

  return result.changes > 0;
}
