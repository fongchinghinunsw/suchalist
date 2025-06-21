import { db } from '@/database/db';
import { FolderRow } from '@/database/types/folder';

export function getAllFolderRows(): FolderRow[] {
  return db.prepare<FolderRow[], FolderRow>('SELECT * FROM folders').all();
}
