import { db } from '../init';
import { ListRow } from '../types/task';

export function getListById(id: string): ListRow | null {
  const list = db.prepare<string, ListRow>('SELECT * FROM lists WHERE id = ?').get(id);

  if (!list) {
    return null;
  }

  return list;
}
