import { SQLiteDatabase } from 'expo-sqlite';
import { DatabaseMigration, UserVersion } from '@/types';
import logger from '@/logger';

class DbMigrationRunner {
  constructor(private db: SQLiteDatabase) {}

  async version(): Promise<UserVersion> {
    try {
      const userVersion = await this.db.getFirstAsync<UserVersion>('PRAGMA user_version');
      return userVersion || { user_version: -1 };
    } catch (e) {
      throw new Error('Cannot get user version', { cause: e });
    }
  }

  private async saveVersion(version: number): Promise<void> {
    try {
      await this.db.execAsync(`PRAGMA user_version = ${version}`);
    } catch (e) {
      throw new Error('Cannot save user version', { cause: e });
    }
  }

  private async runMigration(userVersion: number, migrations: DatabaseMigration[]): Promise<number> {
    return migrations.slice(userVersion).reduce(async (previousPromise, currentMigration, index) => {
      const previousVersion = await previousPromise;
      if (previousVersion < userVersion + index) {
        return previousVersion; // Stop if a previous migration failed
      }
      await this.db.withTransactionAsync(async () => {
        try {
          logger.log(`Executing ${currentMigration.name}`);
          await currentMigration.up(this.db);
        } catch (error) {
          throw new Error(`Could not execute migration`, { cause: error });
        }
      });
      return userVersion + index + 1;
    }, Promise.resolve(userVersion));
  }

  public async apply(migrations: DatabaseMigration[]): Promise<UserVersion> {
    const userVersion = await this.version();
    const nextVersion = await this.runMigration(userVersion.user_version, migrations);
    await this.saveVersion(nextVersion);
    return this.version();
  }
}

export default DbMigrationRunner;
