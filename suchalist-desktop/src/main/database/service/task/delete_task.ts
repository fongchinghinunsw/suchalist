import { deleteTaskRow } from '@/database/repository/task/delete_task_row';

export function deleteTask(id: string) {
  return deleteTaskRow(id);
}
