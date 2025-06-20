import { updateTaskIsStarred } from '@/database/service/task/update_task_is_starred';
import { ipcMain } from 'electron';

export function registerUpdateTaskIsStarredHandler() {
  ipcMain.handle('update-task-is-starred', (_, id: string, isStarred: boolean) => {
    return updateTaskIsStarred(id, isStarred);
  });
}
