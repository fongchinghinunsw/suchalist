import { db } from '@/database/init';
import { ListRow } from '@/database/types/list';

export function insertListRow(list: ListRow) {
  db.prepare<ListRow>(
    `
    INSERT INTO lists VALUES (
      @id,
      @folderId,
      @title,
      @order,
      @folderOrder,
      @createdAt,
      @updatedAt
    )
  `
  ).run(list);
}
