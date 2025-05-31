import { db } from '../init';
import { FolderRow } from '../types/folder';

export function getAllFolderRows(): FolderRow[] {
  return db.prepare<FolderRow[], FolderRow>('SELECT * FROM folders').all();
}

export function getFolderRowById(id: string): FolderRow | null {
  const folder = db.prepare<string, FolderRow>('SELECT * FROM folders WHERE id = ?').get(id);

  if (!folder) {
    return null;
  }

  return folder;
}
