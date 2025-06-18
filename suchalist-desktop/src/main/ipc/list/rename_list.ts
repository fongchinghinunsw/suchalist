import { renameList } from '@/database/service/list/rename_list';
import { ipcMain } from 'electron';

export function registerRenameListHandler() {
  ipcMain.handle('rename-list', (_event, id: string, newTitle: string) => renameList(id, newTitle));
}
