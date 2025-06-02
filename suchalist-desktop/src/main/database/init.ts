import { ENV } from '@common/constants/env';
import Database from 'better-sqlite3';
import { FOLDER_ROWS, LIST_ROWS, TASK_ROWS } from './fake';
import { insertFolderRow } from './repository/folder';
import { insertListRow } from './repository/list';
import { insertTaskRow } from './repository/task';
import { getListRowsCount } from './service/list';

// Create a connection to the DB. If the database file does not exist, it is created.
export const db: InstanceType<typeof Database> = new Database('suchalist.db');

export function init() {
  console.log('environment:', ENV);

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
  if (ENV === 'development') {
    // Check if at least one list exists (DEFAULT list should always exist if the app has been initialized).
    const listRowsCount = getListRowsCount();
    console.log({ listRowsCount });
    if (listRowsCount !== 0) {
      return;
    }

    // INSERT OR IGNORE: Insert a row into a table if the primary key doesn't exist, otherwise simply ignore the statement.
    // const insertFolder = db.prepare(
    //   `INSERT OR IGNORE INTO folders VALUES (@id, @title, @order, @createdAt, @updatedAt)`
    // );
    // const insertList = db.prepare(
    //   `INSERT OR IGNORE INTO lists VALUES (@id, @folderId, @title, @order, @folderOrder, @createdAt, @updatedAt)`
    // );
    // const insertTask = db.prepare(
    //   `INSERT OR IGNORE INTO tasks VALUES (@id, @listId, @title, @note, @dueDate, @isCompleted, @isStarred, @createdAt, @updatedAt, @completedAt)`
    // );

    const insertAll = db.transaction(() => {
      for (const f of FOLDER_ROWS) insertFolderRow(f);
      for (const l of LIST_ROWS) insertListRow(l);
      for (const t of TASK_ROWS) insertTaskRow(t);
    });

    insertAll();
  }
}
