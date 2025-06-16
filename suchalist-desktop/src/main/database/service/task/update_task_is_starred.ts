import { updateTaskRowIsStarred } from '../../repository/task';

export function updateTaskIsStarred(id: string, isStarred: boolean) {
  return updateTaskRowIsStarred(id, isStarred);
}
