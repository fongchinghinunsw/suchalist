import { db } from '@/database/init';
import { ListRow } from '@/database/types/list';

export function getAllListRows(): ListRow[] {
  return db.prepare<ListRow[], ListRow>('SELECT * FROM lists').all();
}
