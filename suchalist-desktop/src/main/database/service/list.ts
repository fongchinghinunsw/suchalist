import { List } from '@common/types/list';
import {
  getListRowById,
  getListRowsCount as getListRowsCountObject,
  insertListRow
} from '../repository/list';
import { ListRow, toList } from '../types/list';
import { normalize } from '../utils/normalize';
import { getTasksByListId } from './task/task';

export function getListRowsCount() {
  return getListRowsCountObject().count;
}

export function getListById(id: string): List | null {
  const list = getListRowById(id);

  if (!list) {
    return null;
  }

  return {
    ...toList(list),
    tasks: getTasksByListId(list.id)
  };
}

export function insertList(list: List) {
  const listRow = normalize<List, ListRow>(list);
  insertListRow(listRow);
}
