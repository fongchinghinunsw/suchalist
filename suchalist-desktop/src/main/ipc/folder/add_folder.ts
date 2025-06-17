import { addFolder } from '@/database/service/folder/add_folder';
import { Folder } from '@common/types/folder';
import { ipcMain } from 'electron';

export function registerAddFolderHandler() {
  ipcMain.handle('add-folder', (_event, folder: Folder) => addFolder(folder));
}
