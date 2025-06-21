import { db } from '@/database/db';
import { ListRow } from '@/database/types/list';

export function getListRowsCount() {
  return (
    db.prepare<ListRow[], { count: number }>('SELECT COUNT(*) as count FROM lists').get() ?? {
      count: 0
    }
  );
}
