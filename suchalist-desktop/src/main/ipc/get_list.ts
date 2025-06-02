import { db } from '@/database/init';
import { ipcMain } from 'electron';

export function registerGetListHandler() {
  ipcMain.handle('get-list', (_, id: string) => {
    const list = db.prepare('SELECT * FROM lists WHERE id = ?').get(id);
    if (!list) {
      return null;
    }

    const tasks = db.prepare('SELECT * FROM tasks WHERE listId = ?').all(id);
    return { ...list, tasks };
  });
}
