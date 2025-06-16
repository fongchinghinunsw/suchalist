import { db } from '@/database/init';

export function updateTaskRowIsStarred(id: string, isStarred: boolean) {
  const stmt = db.prepare(`
    UPDATE tasks
    SET isStarred = @isStarred,
        updatedAt = @updatedAt
    WHERE id = @id
  `);

  const result = stmt.run({
    id,
    isStarred: isStarred ? 1 : 0,
    updatedAt: new Date().toISOString()
  });

  return result.changes > 0;
}
