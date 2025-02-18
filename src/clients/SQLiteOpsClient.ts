import { OpsClient } from '@/clients/types';
import { SQLiteDatabase } from '@/data/sqliteDatabase';

class SQLiteOpsClient implements OpsClient {
  constructor(private db: SQLiteDatabase) {}

  async clear(): Promise<void> {
    await this.db.execAsync(`
DELETE FROM task;`);
  }
  async backup(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async restore(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default SQLiteOpsClient;
