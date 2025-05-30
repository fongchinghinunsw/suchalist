import Database from 'better-sqlite3';
import { FOLDERS, LISTS, TASKS } from './fake';

// Create a connection to the DB. If the database file does not exist, it is created.
const db = new Database('suchalist.db');

export function init() {
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS folders (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS lists (
      id TEXT PRIMARY KEY,
      folderId TEXT,
      title TEXT NOT NULL,
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

  // Insert a row into a table if the primary key doesn't exist, otherwise simply ignore the statement.
  const insertFolder = db.prepare(
    `INSERT OR IGNORE INTO folders VALUES (@id, @title, @createdAt, @updatedAt)`
  );
  const insertList = db.prepare(
    `INSERT OR IGNORE INTO lists VALUES (@id, @folderId, @title, @createdAt, @updatedAt)`
  );
  const insertTask = db.prepare(
    `INSERT OR IGNORE INTO tasks VALUES (@id, @taskListId, @title, @note, @dueDate, @isCompleted, @isStarred, @createdAt, @updatedAt, @completedAt)`
  );

  const insertAll = db.transaction(() => {
    for (const f of FOLDERS) insertFolder.run(f);
    for (const l of LISTS) insertList.run(l);
    for (const t of TASKS) insertTask.run(t);
  });

  insertAll();
}
