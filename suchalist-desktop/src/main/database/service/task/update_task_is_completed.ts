import { updateTaskRowIsCompleted } from '@/database/repository/task';

export function updateTaskIsCompleted(id: string, isCompleted: boolean) {
  return updateTaskRowIsCompleted(id, isCompleted);
}
