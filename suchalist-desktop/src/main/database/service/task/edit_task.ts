import { insertOrReplaceTaskRow } from '@/database/repository/task/insert_or_replace_task_row';
import { normalizeTask } from '@/database/utils/normalize';
import { Task } from '@common/types/task';

export function editTask(task: Task) {
  const taskRow = normalizeTask(task);
  insertOrReplaceTaskRow(taskRow);
}
