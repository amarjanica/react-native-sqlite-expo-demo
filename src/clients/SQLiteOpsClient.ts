import { OpsClient } from '@/clients/types';
import { backupDatabase, restoreDatabase, SQLiteDatabase } from '@/data/sqliteDatabase';

class SQLiteOpsClient implements OpsClient {
  constructor(private db: SQLiteDatabase) {}

  async clear(): Promise<void> {
    await this.db.execAsync(`
DELETE FROM task;`);
  }
  async backup(backupName: string): Promise<void> {
    await backupDatabase(this.db, backupName);
  }
  async restore(): Promise<void> {
    await restoreDatabase(this.db);
  }
}

export default SQLiteOpsClient;
