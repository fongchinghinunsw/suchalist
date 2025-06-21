import { db } from '@/database/db';

export function deleteListRowById(id: string) {
  const stmt = db.prepare(`
      DELETE FROM lists
      WHERE id = ?
    `);

  stmt.run(id);
}
