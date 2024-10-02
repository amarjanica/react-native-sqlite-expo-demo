import { SQLiteDatabase } from 'expo-sqlite';
import { DatabaseMigration } from '@/types';

const migration: DatabaseMigration = {
  name: 'populate',
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
      INSERT INTO task(task) VALUES ('Buy groceries'), ('Clean the house'),('Finish React Native project')
    `);
  },
};

export default migration;
