import { db } from '@/database/init';

export function updateListTitleById(id: string, newTitle: string): boolean {
  const stmt = db.prepare(`
      UPDATE lists
      SET title = @title,
          updatedAt = @updatedAt
      WHERE id = @id
    `);

  const result = stmt.run({
    id,
    title: newTitle,
    updatedAt: new Date().toISOString()
  });

  return result.changes > 0;
}
