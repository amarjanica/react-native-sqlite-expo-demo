import DbMigrationRunner from '@/data/DbMigrationRunner';
import migrations from '../../migrations';
import logger from '@/logger';
import React from 'react';
import { DataContextValue } from '@/data/types';
import SQLiteTaskClient from '@/clients/SQLiteTaskClient';
import SQLiteProvider from '@/data/SQLiteProvider';
import { SQLiteDatabase } from '@/data/sqliteDatabase';
import { dbName } from '@/config';
import SQLiteOpsClient from '@/clients/SQLiteOpsClient';
import { DataContext } from '@/data/DataContext';
import { useAppDispatch } from '@/store';
import { initializeTasks } from '@/store/taskSlice';

const AppDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [clients, setClients] = React.useState<DataContextValue | null>(null);

  const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
    try {
      await new DbMigrationRunner(db).apply(migrations);
      logger.log('All migrations applied.');
      setClients({
        taskClient: new SQLiteTaskClient(db),
        opsClient: new SQLiteOpsClient(db),
      });
    } catch (err) {
      logger.error(err);
    }
  };

  React.useEffect(() => {
    if (clients) {
      dispatch(initializeTasks(clients.taskClient));
    }
  }, [clients, dispatch]);

  return (
    <SQLiteProvider
      databaseName={dbName}
      onInit={migrateDbIfNeeded}>
      {!!clients && <DataContext.Provider value={clients}>{children}</DataContext.Provider>}
    </SQLiteProvider>
  );
};

export default AppDataProvider;
