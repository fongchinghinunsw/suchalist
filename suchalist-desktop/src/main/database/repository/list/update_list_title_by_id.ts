import { db } from '@/database/db';

export function updateListTitleById(id: string, newTitle: string) {
  const stmt = db.prepare(`
      UPDATE lists
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
