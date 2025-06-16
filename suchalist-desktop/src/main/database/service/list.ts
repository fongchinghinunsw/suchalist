import { List } from '@common/types/list';
import { getListRowById } from '../repository/list/get_list_by_id';
import { getListRowsCount as getListRowsCountObject } from '../repository/list/get_list_rows_count';
import { insertListRow } from '../repository/list/insert_list_row';
import { ListRow, toList } from '../types/list';
import { normalize } from '../utils/normalize';
import { getTasksByListId } from './task/get_tasks_by_list_id';

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
