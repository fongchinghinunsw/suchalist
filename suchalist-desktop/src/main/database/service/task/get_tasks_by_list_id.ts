import { getTaskRowsByListId } from '@/database/repository/task/get_task_rows_by_list_id';
import { toTask } from '@/database/types/task';
import { Task } from '@common/types/task';

export function getTasksByListId(id: string): Task[] {
  const taskRows = getTaskRowsByListId(id);
  return taskRows.map((row) => toTask(row));
}
