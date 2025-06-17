import { db } from '@/database/init';

export function deleteListRowById(id: string): boolean {
  const stmt = db.prepare(`
      DELETE FROM lists
      WHERE id = ?
    `);

  const result = stmt.run(id);
  return result.changes > 0;
}
