import { Folder } from '@common/types/folder';
import { getFolderRowById, insertFolderRow } from '../repository/folder';
import { getListsByFolderId } from '../repository/list';
import { toFolder } from '../types/folder';
import { toList } from '../types/list';
import { getTasksByListId } from './task';

export function getFolderById(id: string): Folder | null {
  const folderRow = getFolderRowById(id);

  if (!folderRow) {
    return null;
  }

  return {
    ...toFolder(folderRow),
    lists: getListsByFolderId(id).map((listRow) => ({
      ...toList(listRow),
      tasks: getTasksByListId(listRow.id)
    }))
  };
}

export function insertFolder(folder: Folder) {
  insertFolderRow(folder);
}
