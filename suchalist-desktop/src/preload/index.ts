import { List } from '@common/types/list';
import { Task } from '@common/types/task';
import { contextBridge, ipcRenderer } from 'electron';

// Custom APIs for renderer
const database = {
  getResources: () => ipcRenderer.invoke('get-resources'),
  getListWithTasks: (listId: string) => ipcRenderer.invoke('get-list-with-tasks', listId),
  addTask: (task: Task) => ipcRenderer.invoke('add-task', task),
  deleteTask: (id: string) => ipcRenderer.invoke('delete-task', id),
  editTask: (task: Task) => ipcRenderer.invoke('edit-task', task),
  updateTaskIsStarred: (id: string, isStarred: boolean) =>
    ipcRenderer.invoke('update-task-is-starred', id, isStarred),
  updateTaskIsCompleted: (id: string, isCompleted: boolean) =>
    ipcRenderer.invoke('update-task-is-completed', id, isCompleted),
  addList: (list: List) => ipcRenderer.invoke('add-list', list)
};

const api = {
  selectAndSavePhoto: () => ipcRenderer.invoke('select-and-save-photo'),
  removePhoto: (imageUri: string) => ipcRenderer.invoke('remove-photo', imageUri)
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('database', database);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.database = database;
}
