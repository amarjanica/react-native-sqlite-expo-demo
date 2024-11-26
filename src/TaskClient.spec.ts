import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import TaskClient from '@/TaskClient';
import DbMigrationRunner from '@/DbMigrationRunner';
import migration1 from '../migrations/001_initial';

describe('TaskClient', () => {
  let sqlite: SQLiteDatabase;

  beforeEach(async () => {
    sqlite = await openDatabaseAsync('test.db');
    await new DbMigrationRunner(sqlite).apply([migration1]);
  });

  it('should read all tasks', async () => {
    const taskClient = new TaskClient(sqlite);

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
