import { insertListRow } from '@/database/repository/list/insert_list_row';
import { ListRow } from '@/database/types/list';
import { normalize } from '@/database/utils/normalize';
import { List } from '@common/types/list';

export function addList(list: List) {
  const listRow = normalize<List, ListRow>(list);
  insertListRow(listRow);
}
