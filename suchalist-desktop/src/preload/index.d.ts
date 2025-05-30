import { ElectronAPI } from '@electron-toolkit/preload';
import { List } from '@renderer/services/task_service/types';

declare global {
  interface Window {
    electron: ElectronAPI;
    taskAPI: {
      getList: (listId: string) => Promise<List | null>;
    };
  }
}
