import { Task } from '@/types';
import { TaskClient } from '@/taskClient/types';
import { SQLiteDatabase } from '@/data/sqliteDatabase';

class SQLiteTaskClient implements TaskClient {
  constructor(private db: SQLiteDatabase) {}

  async tasks(): Promise<Task[]> {
    const rawValues = await this.db.getAllAsync<
      Omit<Task, 'createdAt' | 'updatedAt'> & {
        createdAt: string;
        updatedAt: string;
      }
    >('SELECT id, task, created_at as "createdAt", updated_at as "updatedAt" from task');

    return rawValues.map((value) => ({
      ...value,
      createdAt: new Date(value.createdAt),
      updatedAt: new Date(value.updatedAt),
    }));
  }

  async task(id: number): Promise<Task | null> {
    const rawValue = await this.db.getFirstAsync<
      Omit<Task, 'createdAt' | 'updatedAt'> & {
        createdAt: string;
        updatedAt: string;
      }
    >('SELECT id, task, created_at as "createdAt", updated_at as "updatedAt" from task WHERE id = ?', [id]);
    if (!rawValue) {
      return null;
    }

    return {
      ...rawValue,
      createdAt: new Date(rawValue.createdAt),
      updatedAt: new Date(rawValue.updatedAt),
    };
  }

  async add(taskName: string): Promise<Task> {
    const result = await this.db.runAsync('INSERT INTO task(task) VALUES (?)', [taskName]);

    return await this.task(result.lastInsertRowId);
  }

  async delete(id: number): Promise<void> {
    await this.db.runAsync('DELETE FROM task WHERE id = ?', [id]);
  }
}

export default SQLiteTaskClient;
