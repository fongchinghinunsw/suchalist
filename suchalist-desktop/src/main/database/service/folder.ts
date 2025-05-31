import { Folder } from '@common/types/folder';
import { getFolderRowById } from '../repository/folder';
import { getListsByFolderId } from '../repository/list';
import { getTasksByListId } from './task';

export function getFolderById(id: string): Folder | null {
  const folder = getFolderRowById(id);

  if (!folder) {
    return null;
  }

  return {
    ...folder,
    lists: getListsByFolderId(id).map((listRow) => ({
      ...listRow,
      tasks: getTasksByListId(listRow.id)
    }))
  };
}
