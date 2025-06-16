import { db } from '@/database/init';
import { ListRow } from '@/database/types/list';

export function getListRowsCount() {
  return (
    db.prepare<ListRow[], { count: number }>('SELECT COUNT(*) as count FROM lists').get() ?? {
      count: 0
    }
  );
}
