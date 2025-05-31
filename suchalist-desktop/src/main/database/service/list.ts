import { List } from '@common/types/list';
import { getListRowById } from '../repository/list';
import { getTasksByListId } from './task';

export function getListById(id: string): List | null {
  const list = getListRowById(id);

  if (!list) {
    return null;
  }

  return {
    ...list,
    tasks: getTasksByListId(list.id)
  };
}
