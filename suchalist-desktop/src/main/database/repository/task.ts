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
