import { List } from '@common/types/list';
import {
  getListRowById,
  getListRowsCount as getListRowsCountObject,
  insertListRow
} from '../repository/list';
import { ListRow, ListSchema } from '../types/list';
import { normalize } from '../utils/normalize';
import { getTasksByListId } from './task';

export function getListRowsCount() {
  return getListRowsCountObject().count;
}

export function getListById(id: string): List | null {
  const list = getListRowById(id);

  if (!list) {
    return null;
  }

  return {
    ...ListSchema.parse(list),
    tasks: getTasksByListId(list.id)
  };
}

export function insertList(list: List) {
  const listRow = normalize<List, ListRow>(list);
  insertListRow(listRow);
}
