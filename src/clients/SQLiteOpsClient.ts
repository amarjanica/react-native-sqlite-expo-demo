import { OpsClient } from '@/clients/types';
import { SQLiteDatabase } from '@/data/sqliteDatabase';

class SQLiteOpsClient implements OpsClient {
  constructor(private db: SQLiteDatabase) {}

  async clear(): Promise<void> {
    const tables = await this.db.getAllAsync<{ name: string }>(`SELECT name FROM sqlite_master WHERE type='table';`);
    const deleteStatements = tables.map((table) => `DELETE FROM ${table.name};`).join('\n');
    await this.db.execAsync(`
PRAGMA foreign_keys=off;
BEGIN TRANSACTION;

DELETE FROM sqlite_sequence;

${deleteStatements}

PRAGMA foreign_keys=on;
COMMIT;`);
  }
  async backup(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async restore(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default SQLiteOpsClient;
