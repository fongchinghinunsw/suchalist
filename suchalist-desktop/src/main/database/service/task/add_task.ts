import { insertTaskRow } from '@/database/repository/task';
import { normalizeTask } from '@/database/utils/normalize';
import { Task } from '@common/types/task';

export function addTask(task: Task) {
  const taskRow = normalizeTask(task);
  insertTaskRow(taskRow);
}
