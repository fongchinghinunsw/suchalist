import { updateTaskIsCompleted } from '@/database/service/task/task';
import { ipcMain } from 'electron';

export function registerUpdateTaskIsCompletedHandler() {
  ipcMain.handle('update-task-is-completed', (_, id: string, isCompleted: boolean) => {
    return updateTaskIsCompleted(id, isCompleted);
  });
}
