import { SQLiteDatabase } from '@/data/sqliteDatabase';
import { DatabaseMigration } from '@/types';

const migration: DatabaseMigration = {
  name: 'create initial tables',
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
CREATE TABLE task (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    task       TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);`);
  },
};

export default migration;
