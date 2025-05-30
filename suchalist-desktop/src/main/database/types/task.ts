export type TaskRow = {
  id: string;
  listId: string;
  title: string;
  note: string | null;
  dueDate: string | null;
  // SQLite doesn't have boolean, so use 0/1
  isCompleted: number;
  isStarred: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};

export type ListRow = {
  id: string;
  folderId: string | null;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type FolderRow = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};
