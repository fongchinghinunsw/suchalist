import Database from 'better-sqlite3';

// Create a connection to the DB. If the database file does not exist, it is created.

export const db: InstanceType<typeof Database> = new Database('suchalist.db');
