import { List } from '@common/types/list';
import { Resource } from '@common/types/resource';
import { Task } from '@common/types/task';

declare global {
  interface Window {
    electron: ElectronAPI;
    database: {
      getResources: () => Promise<Resource[]>;
      getList: (listId: string) => Promise<List | null>;
      insertTask: (task: Task) => Promise<void>;
      deleteTask: (id: string) => Promise<void>;
      updateTaskIsCompleted: (id: string, isCompleted: boolean) => boolean;
      updateTaskIsStarred: (id: string, isStarred: boolean) => boolean;
    };
    api: {
      selectAndSavePhoto: () => Promise<string>;
      removePhoto: (imageUri: string) => Promise<void>;
    };
  }
}
