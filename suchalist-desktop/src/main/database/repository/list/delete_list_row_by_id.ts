import { db } from '@/database/init';

export function deleteListRowById(id: string) {
  const stmt = db.prepare(`
      DELETE FROM lists
      WHERE id = ?
    `);

  stmt.run(id);
}
