import { db } from '../init';

export function getListById(id: string) {
  const list = db.prepare('SELECT * FROM lists WHERE id = ?').get(id);
  if (!list) {
    return null;
  }

  return list;
}
