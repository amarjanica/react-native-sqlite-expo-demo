import { TaskClient } from '@/clients/types';
import { Task } from '@/types';
import { IDBPDatabase } from 'idb';
import { IndexedDBSchema } from '@/data/types';

const toTask = (dbObject: IndexedDBSchema['tasks']['value']): Task => ({
  ...dbObject,
  createdAt: new Date(dbObject.createdAt),
  updatedAt: new Date(dbObject.updatedAt),
});

class IndexedDBTaskClient implements TaskClient {
  constructor(private db: IDBPDatabase<IndexedDBSchema>) {}

  async add(taskName: string): Promise<Task> {
    const now = new Date();
    const task: Task = {
      id: Date.now(),
      task: taskName,
      createdAt: now,
      updatedAt: now,
    };
    await this.db.add('tasks', { ...task, createdAt: now.toISOString(), updatedAt: now.toISOString() });
    return task;
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

export default IndexedDBTaskClient;
