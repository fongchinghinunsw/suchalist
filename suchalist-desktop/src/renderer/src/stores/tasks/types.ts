import { Task } from '@/services/task_service/types';

export type FinishedTask = Task & {
  finishedAt: string;
};

export type TaskWithDueDate = Task & { dueDate: string };

export type CompletedTask = Task & { completedAt: string };

export type NewTask = Pick<Task, 'title' | 'note' | 'dueDate'>;

export type EditTask = Pick<Task, 'title' | 'note' | 'dueDate'>;
