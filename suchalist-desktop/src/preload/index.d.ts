import { List } from '@common/types/list';
import { Resource } from '@common/types/resource';
import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    database: {
      getResources: () => Resource;
      getList: (listId: string) => Promise<List | null>;
    };
  }
}
