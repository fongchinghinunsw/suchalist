import { updateTaskRowIsStarred } from '@/database/repository/task/update_task_row_is_starred';

export function updateTaskIsStarred(id: string, isStarred: boolean) {
  return updateTaskRowIsStarred(id, isStarred);
}
