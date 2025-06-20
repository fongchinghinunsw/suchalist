import { ipcMain, ipcRenderer } from 'electron';
import { IpcMapping } from './type';

export function ipcMainHandle<Key extends keyof IpcMapping>(
  key: Key,
  handler: () => IpcMapping[Key]
) {
  ipcMain.handle(key, () => handler());
}

export function ipcRendererInvoke<Key extends keyof IpcMapping>(key: Key) {
  return ipcRenderer.invoke(key);
}
