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

  async add(task: string): Promise<void> {
    const allTasks = await this.tasks();
    const newTask: Task = {
      id: allTasks.length + 1,
      task,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedTasks = [...allTasks, newTask];
    await AsyncStorage.setItem(LocalStorageTaskClient.key, JSON.stringify(updatedTasks));
  }

  async delete(id: number): Promise<void> {
    let tasks = await this.tasks();
    tasks = tasks.filter((task) => task.id !== id);
    await AsyncStorage.setItem(LocalStorageTaskClient.key, JSON.stringify(tasks));
  }
}

export default LocalStorageTaskClient;
