import { db } from '@/database/db';
import { TaskRow } from '@/database/types/task';

export function insertOrReplaceTaskRow(task: TaskRow) {
  db.prepare<TaskRow>(
    `
    INSERT OR REPLACE INTO tasks VALUES (
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
