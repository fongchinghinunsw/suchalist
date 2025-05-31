import { ListRow } from '@/database/types/list';
import { db } from '../init';

export function getAllListRows(): ListRow[] {
  return db.prepare<ListRow[], ListRow>('SELECT * FROM lists').all();
}

export function getListRowById(id: string): ListRow | null {
  const list = db.prepare<string, ListRow>('SELECT * FROM lists WHERE id = ?').get(id);

  if (!list) {
    return null;
  }

  return list;
}

export function getListsByFolderId(id: string): ListRow[] {
  return db.prepare<string, ListRow>('SELECT * FROM lists WHERE folderId = ?').all(id);
}
