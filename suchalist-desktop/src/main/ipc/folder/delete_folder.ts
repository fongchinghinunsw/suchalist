import { deleteFolder } from '@/database/service/folder/delete_folder';
import { ipcMain } from 'electron';

export function registerDeleteFolderHandler() {
  ipcMain.handle('delete-folder', (_event, id: string) => deleteFolder(id));
}
