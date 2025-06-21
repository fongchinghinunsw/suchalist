import { List } from '@common/types/list';
import { Task } from '@common/types/task';
import { ListRow } from '../types/list';
import { TaskRow } from '../types/task';

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
