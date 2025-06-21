import { db } from '@/database/db';

export function deleteTaskRow(id: string) {
  const stmt = db.prepare(`
        DELETE FROM tasks WHERE id = ?
      `);

  stmt.run(id);
}
