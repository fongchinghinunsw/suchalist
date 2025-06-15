import { replaceTaskRow } from '@/database/repository/task';
import { normalizeTask } from '@/database/utils/normalize';
import { Task } from '@common/types/task';

export function editTask(task: Task) {
  const taskRow = normalizeTask(task);
  replaceTaskRow(taskRow);
}
