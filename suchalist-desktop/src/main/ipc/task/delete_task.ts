import { deleteTask } from '@/database/service/task/delete_task';
import { ipcMain } from 'electron';

export function registerDeleteTaskHandler() {
  ipcMain.handle('delete-task', (_event, id: string) => deleteTask(id));
}
