import { openDatabaseAsync, SQLiteDatabase, SQLiteOpenOptions } from 'expo-sqlite';
import React, { createContext, useContext, useEffect, useState } from 'react';
import logger from '@/logger';

export interface SQLiteProviderAssetSource {
  /**
   * The asset ID returned from the `require()` call.
   */
  assetId: number;

  /**
   * Force overwrite the local database file even if it already exists.
   * @default false
   */
  forceOverwrite?: boolean;
}

export interface SQLiteProviderProps {
  /**
   * The name of the database file to open.
   */
  databaseName: string;

  /**
   * Open options.
   */
  options?: SQLiteOpenOptions;
  assetSource?: SQLiteProviderAssetSource;
  children: React.ReactNode;
  onError?: (error: Error) => void;
  useSuspense?: boolean;
}

/**
 * Create a context for the SQLite database
 */
const SQLiteContext = createContext<SQLiteDatabase | null>(null);

export function useSQLiteContext(): SQLiteDatabase {
  const context = useContext(SQLiteContext);
  if (context == null) {
    throw new Error('useSQLiteContext must be used within a <SQLiteProvider>');
  }
  return context;
}

function SQLiteProvider({
  databaseName,
  children,
  onInit,
}: Pick<SQLiteProviderProps, 'databaseName' | 'children'> & {
  onInit: (db: SQLiteDatabase) => Promise<void>;
}) {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const isMounting = React.useRef(true);
  const isRunning = React.useRef(false); // New flag to track if the setup is still running

  useEffect(() => {
    const setup = async () => {
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
    };

    setup();

    return () => {
      isMounting.current = true;
    };
  }, [databaseName]);

  if (error != null) {
    logger.error(error, 'Cannot initiate db');
    return null; // or a fallback UI
  }

  const isFullyLoaded = !loading && !!db;

  return isFullyLoaded && <SQLiteContext.Provider value={db}>{children}</SQLiteContext.Provider>;
}

export default SQLiteProvider
