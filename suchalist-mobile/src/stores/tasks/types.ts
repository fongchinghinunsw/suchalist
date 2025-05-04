export enum RecurrenceType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate: string; // ISO String
  isCompleted: boolean;
  recurrence?: {
    type: RecurrenceType;
    originalParentId: string; // id of the first recurring task being created
  };
};

export type NewTask = Omit<Task, 'id' | 'isCompleted' | 'recurrence'> & {
  recurrence?: {
    type: RecurrenceType;
  };
};

export type EditTask = Omit<Task, 'isCompleted' | 'recurrence'> & {
  recurrence?: {
    type: RecurrenceType;
  };
};
