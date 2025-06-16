import { updateTaskRowIsCompleted } from '@/database/repository/task/update_task_row_is_completed';

export function updateTaskIsCompleted(id: string, isCompleted: boolean) {
  return updateTaskRowIsCompleted(id, isCompleted);
}
