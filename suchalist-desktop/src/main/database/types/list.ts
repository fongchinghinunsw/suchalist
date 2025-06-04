import { List } from '@common/types/list';

export type ListRow = {
  id: string;
  folderId: string | null;
  title: string;
  order: number | null;
  folderOrder: number | null;
  createdAt: string;
  updatedAt: string;
};

export function toListRow(list: List): ListRow {
  return {
    ...list,
    folderId: list.folderId === undefined ? null : list.folderId,
    order: list.order === undefined ? null : list.order,
    folderOrder: list.folderOrder === undefined ? null : list.folderOrder
  };
}

export function toList(listRow: ListRow): Omit<List, 'tasks'> {
  return {
    ...listRow,
    folderId: listRow.folderId === null ? undefined : listRow.folderId,
    order: listRow.order === null ? undefined : listRow.order,
    folderOrder: listRow.folderOrder === null ? undefined : listRow.folderOrder
  };
}
