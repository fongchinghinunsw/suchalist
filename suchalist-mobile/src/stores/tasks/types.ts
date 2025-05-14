// export enum RecurrenceType {
//   DAILY = 'DAILY',
//   WEEKLY = 'WEEKLY',
//   MONTHLY = 'MONTHLY',
// }

import {Task} from '@/services/task-service/types';

export type FinishedTask = Task & {
  finishedAt: string;
};

export type TaskWithDueDate = Task & {dueDate: string};

export type NewTask = Pick<Task, 'title' | 'note' | 'dueDate'>;

export type EditTask = Pick<Task, 'title' | 'note' | 'dueDate'>;
