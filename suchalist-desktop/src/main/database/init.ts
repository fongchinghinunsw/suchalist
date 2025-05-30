import Database from 'better-sqlite3';

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
}
