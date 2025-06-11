import { List } from '@common/types/list';
import { Resource } from '@common/types/resource';

declare global {
  interface Window {
    electron: ElectronAPI;
    database: {
      getResources: () => Promise<Resource[]>;
      getList: (listId: string) => Promise<List | null>;
      updateTaskIsCompleted: (id: string, isCompleted: boolean) => boolean;
      updateTaskIsStarred: (id: string, isStarred: boolean) => boolean;
    };
    api: {
      selectAndSavePhoto: () => Promise<string>;
      removePhoto: (imageUri: string) => Promise<void>;
    };
  }
}
