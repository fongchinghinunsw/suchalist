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
};

export type TaskList = {
  id: string;
  title: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
};

export type TaskListFolder = {
  id: string;
  title: string;
  taskLists: Pick<TaskList, 'id' | 'title'>[];
  createdAt: string;
  updatedAt: string;
};

export type ListResource = Pick<TaskList, 'id' | 'title'> & {type: 'LIST'};

export type FolderResource = TaskListFolder & {type: 'FOLDER'};

export type Resource = ListResource | FolderResource;

export type TaskWithDueDate = Task & {dueDate: string};

export type NewTask = Pick<Task, 'title' | 'note' | 'dueDate'>;

export type EditTask = Pick<Task, 'title' | 'note' | 'dueDate'>;
