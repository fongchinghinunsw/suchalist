import { ListRow } from '@/database/types/list';
import { db } from '../init';

export function getListRowById(id: string): ListRow | null {
  const list = db.prepare<string, ListRow>('SELECT * FROM lists WHERE id = ?').get(id);

  if (!list) {
    return null;
  }

  return list;
}
