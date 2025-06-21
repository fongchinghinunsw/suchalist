import { is } from '@electron-toolkit/utils';
import { db } from './db';
import { FOLDER_ROWS, LIST_ROWS, TASK_ROWS } from './fake';
import { insertFolderRow } from './repository/folder/insert_folder_row';
import { insertListRow } from './repository/list/insert_list_row';
import { insertOrReplaceTaskRow } from './repository/task/insert_or_replace_task_row';
import { getListRowsCount } from './service/list/get_list_rows_count';

export function init() {
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS folders (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      "order" INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS lists (
      id TEXT PRIMARY KEY,
      folderId TEXT,
      title TEXT NOT NULL,
      "order" INTEGER,
      folderOrder INTEGER,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (folderId) REFERENCES folders(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      listId TEXT NOT NULL,
      title TEXT NOT NULL,
      note TEXT,
      dueDate TEXT,
      isCompleted INTEGER NOT NULL,
      isStarred INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      completedAt TEXT,
      FOREIGN KEY (listId) REFERENCES lists(id) ON DELETE CASCADE
    );
    `);

  // Insert fake data in development build
  if (is.dev) {
    // Check if at least one list exists (DEFAULT list should always exist if the app has been initialized).
    const listRowsCount = getListRowsCount();
    if (listRowsCount !== 0) {
      return;
    }
    console.log('Inserting fake data...');

    const insertAll = db.transaction(() => {
      for (const f of FOLDER_ROWS) insertFolderRow(f);
      for (const l of LIST_ROWS) insertListRow(l);
      for (const t of TASK_ROWS) insertOrReplaceTaskRow(t);
    });

    insertAll();
  }
}
