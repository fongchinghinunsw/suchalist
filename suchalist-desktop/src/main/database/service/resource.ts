import { Folder } from '@common/types/folder';
import { isListWithOrder, List, ListWithOrder } from '@common/types/list';
import { Resource } from '@common/types/resource';
import { getAllFolderRows } from '../repository/folder';
import { getAllListRows } from '../repository/list';
import { ListSchema } from '../types/list';
import { getTasksByListId } from './task';

export function getResources(): Resource[] {
  const folderRows = getAllFolderRows();
  const listRows = getAllListRows();

  const folders: Folder[] = [];
  const topLevelLists: ListWithOrder[] = [];

  const folderMap = new Map<string, Folder>();
  const listMap = new Map<string, List>();
  const listsInFolderMap = new Map<string, List[]>();

  listRows.forEach((listRow) => {
    const { id, folderId } = listRow;

    const tasks = getTasksByListId(id);

    const list: List = {
      ...ListSchema.parse(listRow),
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
      if (isListWithOrder(list)) {
        topLevelLists.push(list);
      }
    }
  });

  folderRows.forEach((folderRow) => {
    const { id } = folderRow;

    const listsInFolder = listsInFolderMap.get(folderRow.id) ?? [];

    const folder: Folder = {
      ...folderRow,
      lists: listsInFolder
    };

    folderMap.set(id, folder);

    folders.push(folder);
  });

  const resources = [...folders, ...topLevelLists];
  resources.sort((a, b) => a.order - b.order);

  return resources;
}
