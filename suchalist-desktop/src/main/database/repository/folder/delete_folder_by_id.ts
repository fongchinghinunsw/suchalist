import { db } from '@/database/init';

export function deleteFolderRowById(id: string): boolean {
  const stmt = db.prepare(`
      DELETE FROM folders
      WHERE id = ?
    `);

  const result = stmt.run(id);
  return result.changes > 0;
}
