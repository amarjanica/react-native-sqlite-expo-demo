import { TaskClient } from '@/taskClient/types';
import { Task } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorageTaskClient implements TaskClient {
  private static key = 'tasks';

  async tasks(): Promise<Task[]> {
    const rawValues = await AsyncStorage.getItem(LocalStorageTaskClient.key);
    if (!rawValues) {
      return [];
    }
    const tasks: Task[] = JSON.parse(rawValues);
    return tasks.map((task) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    }));
  }

  async task(id: number): Promise<Task | null> {
    const tasks = await this.tasks();
    return tasks.find((task) => task.id === id) || null;
  }

  async add(taskName: string): Promise<Task> {
    const now = new Date();
    const newTask: Task = {
      id: now.getTime(),
      task: taskName,
      createdAt: now,
      updatedAt: now,
    };
    const updatedTasks = [...(await this.tasks()), newTask];
    await AsyncStorage.setItem(LocalStorageTaskClient.key, JSON.stringify(updatedTasks));
    return newTask;
  }

  async delete(id: number): Promise<void> {
    let tasks = await this.tasks();
    tasks = tasks.filter((task) => task.id !== id);
    await AsyncStorage.setItem(LocalStorageTaskClient.key, JSON.stringify(tasks));
  }
}

export default LocalStorageTaskClient;
