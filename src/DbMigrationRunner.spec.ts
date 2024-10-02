import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import DbMigrationRunner from '@/DbMigrationRunner';
import migrations from '../migrations';

describe('DbMigrationRunner', () => {
  let sqlite: SQLiteDatabase;

  beforeEach(async () => {
    sqlite = await openDatabaseAsync('test.db');
  });

  it('should migrate', async () => {
    const runner = new DbMigrationRunner(sqlite);

    const currVersion = (await runner.version()).user_version;
    expect(currVersion).toBe(0);

    const lastVersion = (await runner.apply(migrations)).user_version;
    expect(lastVersion).toBeGreaterThan(0);
  });

  afterEach(async () => {
    await sqlite.closeAsync();
  });
});
