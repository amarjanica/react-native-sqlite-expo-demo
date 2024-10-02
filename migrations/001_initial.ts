import { SQLiteDatabase } from 'expo-sqlite';
import { DatabaseMigration } from '@/types';

const migration: DatabaseMigration = {
  name: 'create initial tables',
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
CREATE TABLE task (
    id INTEGER PRIMARY KEY,
    task TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);
  },
};

export default migration;
