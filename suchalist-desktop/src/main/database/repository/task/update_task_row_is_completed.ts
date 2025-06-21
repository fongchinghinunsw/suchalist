import { db } from '@/database/db';

export function updateTaskRowIsCompleted(id: string, isCompleted: boolean) {
  const stmt = db.prepare(`
    UPDATE tasks
    SET isCompleted = @isCompleted,
        updatedAt = @updatedAt
    WHERE id = @id
  `);

  stmt.run({
    id,
    isCompleted: isCompleted ? 1 : 0,
    updatedAt: new Date().toISOString()
  });
}
