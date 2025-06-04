import { Task } from '@common/types/task';

export type TaskRow = {
  id: string;
  listId: string;
  title: string;
  note: string | null;
  dueDate: string | null;
  isCompleted: 1 | 0;
  isStarred: 1 | 0;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};

export function toTaskRow(task: Task): TaskRow {
  return {
    ...task,
    note: task.note === undefined ? null : task.note,
    dueDate: task.dueDate === undefined ? null : task.dueDate,
    isCompleted: task.isCompleted ? 1 : 0,
    isStarred: task.isStarred ? 1 : 0,
    completedAt: task.completedAt === undefined ? null : task.completedAt
  };
}

export function toTask(taskRow: TaskRow): Task {
  return {
    ...taskRow,
    note: taskRow.note === null ? undefined : taskRow.note,
    dueDate: taskRow.dueDate === null ? undefined : taskRow.dueDate,
    isCompleted: taskRow.isCompleted === 1,
    isStarred: taskRow.isStarred === 1,
    completedAt: taskRow.completedAt === null ? undefined : taskRow.completedAt
  };
}
