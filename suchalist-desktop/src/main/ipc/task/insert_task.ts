import { insertTask } from '@/database/service/task/task';
import { Task } from '@common/types/task';
import { ipcMain } from 'electron';

export function registerInsertTaskHandler() {
  ipcMain.handle('insert-task', (_event, task: Task) => insertTask(task));
}
