import { renameFolder } from '@/database/service/folder/rename_folder';
import { ipcMain } from 'electron';

export function registerRenameFolderHandler() {
  ipcMain.handle('rename-folder', (_event, id: string, newTitle: string) =>
    renameFolder(id, newTitle)
  );
}
