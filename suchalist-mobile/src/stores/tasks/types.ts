// export enum RecurrenceType {
//   DAILY = 'DAILY',
//   WEEKLY = 'WEEKLY',
//   MONTHLY = 'MONTHLY',
// }

export type Task = {
  id: string;
  taskListId: string;
  title: string;
  note?: string;
  dueDate?: string;
  isCompleted: boolean;
  //   recurrence?: {
  //     type: RecurrenceType;
  //     originalParentId: string; // id of the first recurring task being created
  //   };
  createdAt: string;
  updatedAt: string;
  finishedAt?: string;
};

export type FinishedTask = Task & {
  finishedAt: string;
};

export type List = {
  id: string;
  title: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
};

export type Folder = {
  id: string;
  title: string;
  lists: string[];
  createdAt: string;
  updatedAt: string;
};

export type TaskWithDueDate = Task & {dueDate: string};

export type NewTask = Pick<Task, 'title' | 'note' | 'dueDate'>;

export type EditTask = Pick<Task, 'title' | 'note' | 'dueDate'>;
