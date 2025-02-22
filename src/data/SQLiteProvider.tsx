import React, { createContext, useEffect, useState } from 'react';
import logger from '@/logger';
import { SQLiteDatabase, openDatabaseAsync } from '@/data/sqliteDatabase';

export const SQLiteContext = createContext<{ db: SQLiteDatabase; reload: () => Promise<void> } | null>(null);
function SQLiteProvider({
  databaseName,
  children,
  onInit,
}: {
  databaseName: string;
  children: React.ReactNode;
  onInit: (db: SQLiteDatabase) => Promise<void>;
}) {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const isMounting = React.useRef(true);
  const isRunning = React.useRef(false); // New flag to track if the setup is still running
  const setup = React.useCallback(async () => {
    if (!isMounting.current || isRunning.current) return;

    isMounting.current = false;
    isRunning.current = true;
    try {
      const _db = await openDatabaseAsync(databaseName, undefined);
      await onInit(_db);
      logger.log(`Mounted sqlite provider`);
      setDb(_db);
      setLoading(false);
    } catch (e: any) {
      setError(e);
    } finally {
      isRunning.current = false; // Mark setup as complete
    }
  }, []);

  useEffect(() => {
    void setup();
    return () => {
      isMounting.current = true;
    };
  }, [databaseName]);

  if (error != null) {
    logger.error(error, 'Cannot initiate db');
    return null; // or a fallback UI
  }

  const isFullyLoaded = !loading && !!db;

  return (
    isFullyLoaded && (
      <SQLiteContext.Provider
        value={{
          db,
          reload: async () => {
            isMounting.current = true;
            isRunning.current = false;
            await setup();
          },
        }}>
        {children}
      </SQLiteContext.Provider>
    )
  );
}

export default SQLiteProvider;
