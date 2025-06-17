import { addList } from '@/database/service/list/add_list';
import { List } from '@common/types/list';
import { ipcMain } from 'electron';

export function registerAddListHandler() {
  ipcMain.handle('add-list', (_event, list: List) => addList(list));
}
