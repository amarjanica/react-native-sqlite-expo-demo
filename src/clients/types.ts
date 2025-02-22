import { Task } from '@/types';

export interface TaskClient {
  tasks(): Promise<Task[]>;
  task(id: number): Promise<Task | null>;
  add(task: string): Promise<Task>;
  delete(id: number): Promise<void>;
}

/**
 * OpsClient provides a set of operational utilities
 * for managing system persistence.
 */
export interface OpsClient {
  clear(): Promise<void>;
  backup(backupName: string): Promise<void>;
  restore(): Promise<void>;
}
