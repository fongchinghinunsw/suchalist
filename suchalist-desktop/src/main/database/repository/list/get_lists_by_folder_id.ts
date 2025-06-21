import { db } from '@/database/db';
import { ListRow } from '@/database/types/list';

export function getListsByFolderId(id: string): ListRow[] {
  return db.prepare<string, ListRow>('SELECT * FROM lists WHERE folderId = ?').all(id);
}
