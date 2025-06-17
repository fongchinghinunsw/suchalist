import { insertListRow } from '@/database/repository/list/insert_list_row';
import { normalizeList } from '@/database/utils/normalize';
import { List } from '@common/types/list';

export function addList(list: List) {
  const listRow = normalizeList(list);
  insertListRow(listRow);
}
