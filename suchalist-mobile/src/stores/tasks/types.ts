// export enum RecurrenceType {
//   DAILY = 'DAILY',
//   WEEKLY = 'WEEKLY',
//   MONTHLY = 'MONTHLY',
// }

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  isCompleted: boolean;
  //   recurrence?: {
  //     type: RecurrenceType;
  //     originalParentId: string; // id of the first recurring task being created
  //   };
  createdAt: string;
  updatedAt: string;
};

export type TaskList = {
  id: string;
  title: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
};

export type NewTask = Omit<
  Task,
  'id' | 'isCompleted' | 'createdAt' | 'updatedAt'
> & {
  //   recurrence?: {
  //     type: RecurrenceType;
  //   };
};

export type EditTask = Omit<Task, 'isCompleted' | 'createdAt' | 'updatedAt'> & {
  //   recurrence?: {
  //     type: RecurrenceType;
  //   };
};
