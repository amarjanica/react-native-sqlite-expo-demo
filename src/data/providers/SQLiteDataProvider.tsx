import DbMigrationRunner from '@/DbMigrationRunner';
import migrations from '../../../migrations';
import logger from '@/logger';
import React from 'react';
import { DataProviderProps } from '@/data/types';
import SQLiteTaskClient from '@/taskClient/SQLiteTaskClient';
import SQLiteProvider from '@/SQLiteProvider';
import { SQLiteDatabase } from '@/data/sqliteDatabase';

const SQLiteDataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [db, setDb] = React.useState<SQLiteDatabase | null>(null);

  const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
    try {
      await new DbMigrationRunner(db).apply(migrations);
      logger.log('All migrations applied.');
      setDb(db);
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <SQLiteProvider
      databaseName={`test.db`}
      onInit={migrateDbIfNeeded}>
      {!!db && children({ taskClient: new SQLiteTaskClient(db) })}
    </SQLiteProvider>
  );
};

export default SQLiteDataProvider;
