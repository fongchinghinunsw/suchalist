export type Task = {
  id: string;
  listId: string;
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
  createdAt: string;
  updatedAt: string;
};

export type Resource = List | Folder;
