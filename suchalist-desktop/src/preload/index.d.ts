import { Folder } from '@common/types/folder';
import { List } from '@common/types/list';
import { Resource } from '@common/types/resource';
import { Task } from '@common/types/task';

export type DatabaseApi = {
  getResources: () => Promise<Resource[]>;
  addTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  editTask: (task: Task) => Promise<Task | null>;
  updateTaskIsCompleted: (id: string, isCompleted: boolean) => Promise<boolean>;
  updateTaskIsStarred: (id: string, isStarred: boolean) => Promise<boolean>;
  // List
  addList: (list: List) => Promise<void>;
  renameList: (id: string, newTitle: string) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  // Folder
  addFolder: (folder: Folder) => Promise<void>;
  renameFolder: (id: string, newTitle: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
};

declare global {
  interface Window {
    electron: ElectronAPI;
    database: DatabaseApi;
    api: {
      selectAndSavePhoto: () => Promise<string>;
      removePhoto: (imageUri: string) => Promise<void>;
    };
  }
}
