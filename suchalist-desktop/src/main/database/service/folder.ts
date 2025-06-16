import { Folder } from '@common/types/folder';
import { getFolderRowById } from '../repository/folder/get_folder_row_by_id';
import { insertFolderRow } from '../repository/folder/insert_folder_row';
import { getListsByFolderId } from '../repository/list/get_lists_by_folder_id';
import { toFolder } from '../types/folder';
import { toList } from '../types/list';
import { getTasksByListId } from './task/get_tasks_by_list_id';

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
