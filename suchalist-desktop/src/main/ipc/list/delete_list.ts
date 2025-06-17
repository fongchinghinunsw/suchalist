import { deleteList } from '@/database/service/list/delete_list';
import { ipcMain } from 'electron';

export function registerDeleteListHandler() {
  ipcMain.handle('delete-list', (_event, id: string) => deleteList(id));
}
