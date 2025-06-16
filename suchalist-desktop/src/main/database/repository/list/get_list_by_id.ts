import { db } from '@/database/init';
import { ListRow } from '@/database/types/list';

export function getListRowById(id: string): ListRow | null {
  const list = db.prepare<string, ListRow>('SELECT * FROM lists WHERE id = ?').get(id);

  if (!list) {
    return null;
  }

  return list;
}
