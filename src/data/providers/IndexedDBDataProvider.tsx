import { DataProviderProps, IndexedDBSchema } from '@/data/types';
import React from 'react';
import IndexedDBClient from '@/taskClient/IndexedDBClient';
import { IDBPDatabase, openDB } from 'idb';
import logger from '@/logger';

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

  return <>{children({ taskClient: new IndexedDBClient(db) })}</>;
};

export default IndexedDBDataProvider;
