import { DataProviderProps, IndexedDBSchema } from '@/data/types';
import React from 'react';
import IndexedDBTaskClient from '@/clients/IndexedDBTaskClient';
import { IDBPDatabase, openDB } from 'idb';
import logger from '@/logger';
import IndexedDBOpsClient from '@/clients/IndexedDBOpsClient';

const IndexedDBDataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [db, setDb] = React.useState<IDBPDatabase<IndexedDBSchema> | null>(null);

  React.useEffect(() => {
    const dbVersion = 1;
    const dbName = 'demodb';
    const initializeDatabase = async () => {
      try {
        setDb(
          await openDB<IndexedDBSchema>(dbName, dbVersion, {
            upgrade(db) {
              if (!db.objectStoreNames.contains('tasks')) {
                db.createObjectStore('tasks', {
                  keyPath: 'id',
                  autoIncrement: true,
                });
              }
            },
          })
        );
      } catch (err) {
        logger.error('Failed to initialize IndexedDB:', err);
      }
    };
    void initializeDatabase();
  }, []);

  if (!db) {
    return null;
  }

  return <>{children({ taskClient: new IndexedDBTaskClient(db), opsClient: new IndexedDBOpsClient(db) })}</>;
};

export default IndexedDBDataProvider;
