import { TaskRow } from '@/database/types/task';
import { db } from '../init';

export function getTaskRowsByListId(id: string): TaskRow[] {
  return db.prepare<string, TaskRow>('SELECT * FROM tasks WHERE listId = ?').all(id);
}

export function insertTaskRow(task: TaskRow) {
  db.prepare<TaskRow>(
    `
    INSERT INTO tasks VALUES (
      @id,
      @listId,
      @title,
      @note,
      @dueDate,
      @isCompleted,
      @isStarred,
      @createdAt,
      @updatedAt,
      @completedAt
    )
  `
  ).run(task);
}

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
