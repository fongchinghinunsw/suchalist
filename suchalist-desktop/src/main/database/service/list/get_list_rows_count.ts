import { getListRowsCount as getListRowsCountObject } from '../../repository/list/get_list_rows_count';

export function getListRowsCount() {
  return getListRowsCountObject().count;
}
