import { CompletedTask, TaskWithDueDate } from '@/stores/tasks/types';

export type Task = {
  id: string;
  taskListId: string;
  title: string;
  note?: string;
  dueDate?: string;
  isCompleted: boolean;
  isStarred: boolean;
  //   recurrence?: {
  //     type: RecurrenceType;
  //     originalParentId: string; // id of the first recurring task being created
  //   };
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
};

export type List = {
  id: string;
  folderId?: string;
  title: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
};

export type Folder = {
  id: string;
  title: string;
  lists: List[];
  createdAt: string;
  updatedAt: string;
};

export type Resource = List | Folder;

/**
 * Type guard to check if a resource is a Folder.
 */
export function isFolder(resource: List | Folder): resource is Folder {
  return Array.isArray((resource as Folder).lists);
}

/**
 * Type guard to check if a resource is a List.
 */
export function isList(resource: List | Folder): resource is List {
  return Array.isArray((resource as List).tasks);
}

export function isTaskWithDueDate(task: Task): task is TaskWithDueDate {
  return task.dueDate !== undefined;
}

export function isCompletedTask(task: Task): task is CompletedTask {
  return task.isCompleted === true && task.completedAt !== undefined;
}
