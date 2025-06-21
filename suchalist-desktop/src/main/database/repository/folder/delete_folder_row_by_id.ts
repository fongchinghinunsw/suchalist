import { db } from '@/database/init';

export function deleteFolderRowById(id: string) {
  const stmt = db.prepare(`
      DELETE FROM folders
      WHERE id = ?
    `);

  stmt.run(id);
}
