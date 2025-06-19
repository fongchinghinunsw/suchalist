import { DEFAULT_LIST_ID } from '@common/constants/list';
import { Folder } from './folder';
import { Task } from './task';

export type List = {
  id: string;
  folderId?: string;
  title: string;
  // top-level order (if it's not inside a folder)
  order?: number;
  // order within the folder
  folderOrder?: number;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
};

export function isList(resource: List | Folder): resource is List {
  return Array.isArray((resource as List).tasks);
}

export type ListWithOrder = List & { order: number };

export function isListWithOrder(list: List): list is ListWithOrder {
  return list.order !== undefined;
}

export type ListWithFolderOrder = List & { folderOrder: number };

export function isListWithFolderOrder(list: List): list is ListWithFolderOrder {
  return list.folderOrder !== undefined;
}

export function isDefaultList(list: List): list is List & { id: typeof DEFAULT_LIST_ID } {
  return list.id === DEFAULT_LIST_ID;
}
