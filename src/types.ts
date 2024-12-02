import { SQLiteDatabase } from '@/data/sqliteDatabase';

export type UserVersion = {
  user_version: number;
};

export type DatabaseMigration = {
  name: string;
  up: (db: SQLiteDatabase) => Promise<void>;
};

export type Task = {
  id: number;
  task: string;
  createdAt: Date;
  updatedAt: Date;
};
