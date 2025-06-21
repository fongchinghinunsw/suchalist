import { db } from '@/database/db';

export function deleteFolderRowById(id: string) {
  const stmt = db.prepare(`
      DELETE FROM folders
      WHERE id = ?
    `);

  stmt.run(id);
}
