import { addTask } from '@/database/service/task/add_task';
import { Task } from '@common/types/task';
import { ipcMain } from 'electron';

export function registerAddTaskHandler() {
  ipcMain.handle('add-task', (_event, task: Task) => addTask(task));
}
