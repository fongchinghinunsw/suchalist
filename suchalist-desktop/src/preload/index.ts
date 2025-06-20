import { Folder } from '@common/types/folder';
import { List } from '@common/types/list';
import { Task } from '@common/types/task';
import { ipcRendererInvoke } from '@common/utils/ipc/wrappers';
import { contextBridge, ipcRenderer } from 'electron';

// Custom APIs for renderer
const database = {
  getResources: () => ipcRendererInvoke('getResources'),
  addTask: (task: Task) => ipcRenderer.invoke('add-task', task),
  deleteTask: (id: string) => ipcRenderer.invoke('delete-task', id),
  editTask: (task: Task) => ipcRenderer.invoke('edit-task', task),
  updateTaskIsStarred: (id: string, isStarred: boolean) =>
    ipcRenderer.invoke('update-task-is-starred', id, isStarred),
  updateTaskIsCompleted: (id: string, isCompleted: boolean) =>
    ipcRenderer.invoke('update-task-is-completed', id, isCompleted),
  addList: (list: List) => ipcRenderer.invoke('add-list', list),
  renameList: (id: string, newTitle: string) => ipcRenderer.invoke('rename-list', id, newTitle),
  deleteList: (id: string) => ipcRenderer.invoke('delete-list', id),
  addFolder: (folder: Folder) => ipcRenderer.invoke('add-folder', folder),
  renameFolder: (id: string, newTitle: string) => ipcRenderer.invoke('rename-folder', id, newTitle),
  deleteFolder: (id: string) => ipcRenderer.invoke('delete-folder', id)
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
