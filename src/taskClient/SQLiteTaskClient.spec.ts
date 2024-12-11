import SQLiteTaskClient from '@/taskClient/SQLiteTaskClient';
import DbMigrationRunner from '@/DbMigrationRunner';
import migration1 from '../../migrations/001_initial';
import { SQLiteDatabase, openDatabaseAsync } from '@/data/sqliteDatabase';

describe('SQLiteTaskClient', () => {
  let sqlite: SQLiteDatabase;

  beforeEach(async () => {
    sqlite = await openDatabaseAsync('test.db');
    await new DbMigrationRunner(sqlite).apply([migration1]);
  });

  it('should read all tasks', async () => {
    const taskClient = new SQLiteTaskClient(sqlite);

    const insertStmt = await sqlite.prepareAsync('INSERT INTO task(task) VALUES (?)');
    await insertStmt.executeAsync(['Write']);
    await insertStmt.executeAsync(['Tests']);
    await insertStmt.finalizeAsync();

    const tasks = await taskClient.tasks();

    expect(tasks).toEqual([expect.objectContaining({ task: 'Write' }), expect.objectContaining({ task: 'Tests' })]);
  });

  afterEach(async () => {
    await sqlite.closeAsync();
  });
});
