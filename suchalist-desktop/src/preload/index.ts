import { contextBridge, ipcRenderer } from 'electron';

// Custom APIs for renderer
const database = {
  getResources: () => ipcRenderer.invoke('get-resources'),
  getListWithTasks: (listId: string) => ipcRenderer.invoke('get-list-with-tasks', listId)
};

const api = {
  selectAndSavePhoto: () => ipcRenderer.invoke('select-and-save-photo')
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
