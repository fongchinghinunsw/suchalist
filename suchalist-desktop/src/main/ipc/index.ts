import { addFolder } from '@/database/service/folder/add_folder';
import { deleteFolder } from '@/database/service/folder/delete_folder';
import { renameFolder } from '@/database/service/folder/rename_folder';
import { addList } from '@/database/service/list/add_list';
import { deleteList } from '@/database/service/list/delete_list';
import { renameList } from '@/database/service/list/rename_list';
import { getResources } from '@/database/service/resource';
import { addTask } from '@/database/service/task/add_task';
import { deleteTask } from '@/database/service/task/delete_task';
import { editTask } from '@/database/service/task/edit_task';
import { updateTaskIsCompleted } from '@/database/service/task/update_task_is_completed';
import { updateTaskIsStarred } from '@/database/service/task/update_task_is_starred';
import { Folder } from '@common/types/folder';
import { List } from '@common/types/list';
import { Task } from '@common/types/task';
import { ipcMain } from 'electron';
import registerRemovePhotoHandler from './remove_photo';
import { registerSelectAndSavePhotoHandler } from './select_and_save_photo';

export function registerIpcHandlers() {
  ipcMain.handle('getResources', () => getResources());

  // Task
  ipcMain.handle('add-task', (_event, task: Task) => addTask(task));
  ipcMain.handle('delete-task', (_event, id: string) => deleteTask(id));
  ipcMain.handle('edit-task', (_event, task: Task) => editTask(task));
  ipcMain.handle('update-task-is-completed', (_, id: string, isCompleted: boolean) => {
    return updateTaskIsCompleted(id, isCompleted);
  });
  ipcMain.handle('update-task-is-starred', (_, id: string, isStarred: boolean) => {
    return updateTaskIsStarred(id, isStarred);
  });

  // List
  ipcMain.handle('add-list', (_event, list: List) => addList(list));
  ipcMain.handle('rename-list', (_event, id: string, newTitle: string) => renameList(id, newTitle));
  ipcMain.handle('delete-list', (_event, id: string) => deleteList(id));

  // Folder
  ipcMain.handle('add-folder', (_event, folder: Folder) => addFolder(folder));
  ipcMain.handle('rename-folder', (_event, id: string, newTitle: string) =>
    renameFolder(id, newTitle)
  );
  ipcMain.handle('delete-folder', (_event, id: string) => deleteFolder(id));

  // Other
  registerSelectAndSavePhotoHandler();
  registerRemovePhotoHandler();
}
