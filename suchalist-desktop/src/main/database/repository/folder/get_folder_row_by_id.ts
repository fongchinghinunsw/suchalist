import { db } from '@/database/init';
import { FolderRow } from '@/database/types/folder';

export function getFolderRowById(id: string): FolderRow | null {
  const folder = db.prepare<string, FolderRow>('SELECT * FROM folders WHERE id = ?').get(id);

  if (!folder) {
    return null;
  }

  return folder;
}
