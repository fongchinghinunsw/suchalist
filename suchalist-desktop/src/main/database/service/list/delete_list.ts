import { deleteListRowById } from '@/database/repository/list/delete_list_row_by_id';

export function deleteList(id: string) {
  deleteListRowById(id);
}
