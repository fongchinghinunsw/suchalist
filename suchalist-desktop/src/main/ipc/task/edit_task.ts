import { editTask } from '@/database/service/task/edit_task';
import { Task } from '@common/types/task';
import { ipcMain } from 'electron';

export function registerEditTaskHandler() {
  ipcMain.handle('edit-task', (_event, task: Task) => editTask(task));
}
