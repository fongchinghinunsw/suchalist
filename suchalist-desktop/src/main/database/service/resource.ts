import { Folder } from '@common/types/folder';
import { isDefaultList, isListWithOrder, List } from '@common/types/list';
import { Resource } from '@common/types/resource';
import { getAllFolderRows } from '../repository/folder/get_all_folder_rows';
import { getAllListRows } from '../repository/list/get_all_list_rows';
import { toList } from '../types/list';
import { getTasksByListId } from './task/get_tasks_by_list_id';

export function getResources(): Resource[] {
  const folderRows = getAllFolderRows();
  const listRows = getAllListRows();

  const folders: Folder[] = [];
  const topLevelLists: List[] = [];

  const listMap = new Map<string, List>();
  const listsInFolderMap = new Map<string, List[]>();

  listRows.forEach((listRow) => {
    const { id, folderId } = listRow;

    const tasks = getTasksByListId(id);

    const list: List = {
      ...toList(listRow),
      tasks
    };

    listMap.set(id, list);

    if (folderId) {
      const lists = listsInFolderMap.get(folderId);

      if (lists) {
        listsInFolderMap.set(folderId, [...lists, list]);
      } else {
        listsInFolderMap.set(folderId, [list]);
      }
    } else {
      if (isDefaultList(list) || isListWithOrder(list)) {
        topLevelLists.push(list);
      }
    }
  });

  folderRows.forEach((folderRow) => {
    const listsInFolder = listsInFolderMap.get(folderRow.id) ?? [];

    const folder: Folder = {
      ...folderRow,
      lists: listsInFolder
    };

    folders.push(folder);
  });

  const resources = [...folders, ...topLevelLists];

  return resources;
}
