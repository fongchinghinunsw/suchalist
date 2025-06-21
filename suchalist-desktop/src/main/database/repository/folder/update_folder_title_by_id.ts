import { db } from '@/database/db';

export function updateFolderTitleById(id: string, newTitle: string) {
  const stmt = db.prepare(`
      UPDATE folders
      SET title = @title,
          updatedAt = @updatedAt
      WHERE id = @id
    `);

  stmt.run({
    id,
    title: newTitle,
    updatedAt: new Date().toISOString()
  });
}
