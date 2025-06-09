import { List } from '@common/types/list';
import { Resource } from '@common/types/resource';

declare global {
  interface Window {
    electron: ElectronAPI;
    database: {
      getResources: () => Promise<Resource[]>;
      getList: (listId: string) => Promise<List | null>;
    };
    api: {
      selectAndSavePhoto: () => Promise<string>;
      getImageDataUrl: (filePath: string) => string;
    };
  }
}
