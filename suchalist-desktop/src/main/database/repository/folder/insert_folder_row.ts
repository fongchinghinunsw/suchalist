import { db } from '@/database/db';
import { FolderRow } from '@/database/types/folder';

export function insertFolderRow(folder: FolderRow) {
  db.prepare<FolderRow>(
    `
      INSERT INTO folders VALUES (
        @id,
        @title,
        @order,
        @createdAt,
        @updatedAt
      )
    `
  ).run(folder);
}
