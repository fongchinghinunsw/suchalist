import { db } from '@/database/init';

export function deleteTaskRow(id: string) {
  const stmt = db.prepare(`
        DELETE FROM tasks WHERE id = ?
      `);

  stmt.run(id);
}
