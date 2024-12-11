import { Task } from '@/types';

export interface TaskClient {
  tasks(): Promise<Task[]>;
  task(id: number): Promise<Task | null>;
  add(task: string): Promise<Task>;
  delete(id: number): Promise<void>;
}
