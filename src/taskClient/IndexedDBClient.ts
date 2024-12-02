import { TaskClient } from '@/taskClient/types';
import { Task } from '@/types';
import { IDBPDatabase } from 'idb';
import { IndexedDBSchema } from '@/data/types';

const toTask = (dbObject: IndexedDBSchema['tasks']['value']): Task => ({
  ...dbObject,
  createdAt: new Date(dbObject.createdAt),
  updatedAt: new Date(dbObject.updatedAt),
});

class IndexedDBClient implements TaskClient {
  constructor(private db: IDBPDatabase<IndexedDBSchema>) {}

  async add(task: string): Promise<void> {
    const now = new Date().toISOString();
    await this.db.add('tasks', {
      id: Date.now(),
      task,
      createdAt: now,
      updatedAt: now,
    });
  }

  async delete(id: number): Promise<void> {
    await this.db.delete('tasks', id);
  }

  async task(id: number): Promise<Task | null> {
    const task = await this.db.get('tasks', id);
    if (!task) {
      return null;
    }
    return toTask(task);
  }

  async tasks(): Promise<Task[]> {
    const tasks = await this.db.getAll('tasks');
    return tasks.map(toTask);
  }
}

export default IndexedDBClient;
