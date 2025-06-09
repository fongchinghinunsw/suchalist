import { contextBridge, ipcRenderer, nativeImage } from 'electron';

// Custom APIs for renderer
const database = {
  getResources: () => ipcRenderer.invoke('get-resources'),
  getListWithTasks: (listId: string) => ipcRenderer.invoke('get-list-with-tasks', listId)
};

const api = {
  selectAndSavePhoto: () => ipcRenderer.invoke('select-and-save-photo'),
  getImageDataUrl: (filePath: string): string => {
    try {
      console.log({ filePath });
      const image = nativeImage.createFromPath(filePath);
      console.log({ image });
      console.log(image.isEmpty());
      return image.toDataURL();
    } catch (error) {
      console.error('Failed to convert image:', error);
      return '';
    }
  }
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
