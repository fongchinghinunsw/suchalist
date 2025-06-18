import { updateListTitleById } from '@/database/repository/list/update_list_title_by_id';

export function renameList(id: string, newTitle: string) {
  return updateListTitleById(id, newTitle);
}
