import { SQLiteDatabase, openDatabaseAsync } from '@/data/sqliteDatabase';
import DbMigrationRunner from '@/DbMigrationRunner';
import migrations from '../migrations';
import { dbName } from '@/config';

describe('DbMigrationRunner', () => {
  let sqlite: SQLiteDatabase;

  beforeEach(async () => {
    sqlite = await openDatabaseAsync(dbName);
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
