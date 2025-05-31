export type Task = {
  id: string;
  listId: string;
  title: string;
  note?: string;
  dueDate?: string;
  isCompleted: boolean;
  isStarred: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
};

export type TaskWithDueDate = Task & { dueDate: string };

export type CompletedTask = Task & { completedAt: string };

export function isTaskWithDueDate(task: Task): task is TaskWithDueDate {
  return task.dueDate !== undefined;
}

export function isCompletedTask(task: Task): task is CompletedTask {
  return task.isCompleted === true && task.completedAt !== undefined;
}

export type NewTask = Pick<Task, 'title' | 'note' | 'dueDate'>;

export type EditTask = Pick<Task, 'title' | 'note' | 'dueDate'>;
