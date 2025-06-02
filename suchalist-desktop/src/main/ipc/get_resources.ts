import { getResources } from '@/database/service/resource';
import { ipcMain } from 'electron';

export function registerGetResourcesHandler() {
  ipcMain.handle('get-resources', () => getResources());
}
