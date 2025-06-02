import { Folder } from '@common/types/folder';
import { getFolderRowById, insertFolderRow } from '../repository/folder';
import { getListsByFolderId } from '../repository/list';
import { ListSchema } from '../types/list';
import { getTasksByListId } from './task';

export function getFolderById(id: string): Folder | null {
  const folder = getFolderRowById(id);

  if (!folder) {
    return null;
  }

  return {
    ...folder,
    lists: getListsByFolderId(id).map((listRow) => ({
      ...ListSchema.parse(listRow),
      tasks: getTasksByListId(listRow.id)
    }))
  };
}

export function insertFolder(folder: Folder) {
  insertFolderRow(folder);
}
