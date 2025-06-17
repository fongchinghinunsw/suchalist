import { List } from '@common/types/list';
import { Task } from '@common/types/task';
import { ListRow } from '../types/list';
import { TaskRow } from '../types/task';

type Row = Record<string, string | number | null>;
type Data = Record<string, unknown>;

/**
 *
 * @param input Data in the format used by the frontend.
 * @returns Row in the format that can be stored in the database.
 */
export function normalize<I extends Data, O extends Row>(input: I): O {
  const output: Row = {};

  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'boolean') {
      output[key] = value ? 1 : 0;
    } else if (typeof value === 'string') {
      output[key] = value;
    } else if (value === undefined) {
      output[key] = null;
    }
  }

  return output as O;
}

export function normalizeTask(task: Task): TaskRow {
  return {
    id: task.id,
    listId: task.listId,
    title: task.title,
    note: task.note ?? null,
    dueDate: task.dueDate ?? null,
    isCompleted: task.isCompleted ? 1 : 0,
    isStarred: task.isStarred ? 1 : 0,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    completedAt: task.completedAt ?? null
  };
}

export function normalizeList(list: List): ListRow {
  return {
    id: list.id,
    folderId: list.folderId ?? null,
    title: list.title,
    order: list.order ?? null,
    folderOrder: list.folderOrder ?? null,
    createdAt: list.createdAt,
    updatedAt: list.updatedAt
  };
}
