import { BindParams } from 'sql.js';
import initSqlJs from 'sql.js';
import { loadFromIndexedDB, saveToIndexedDB, saveToIndexedDBBA } from '@/data/indexedDatabase';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import logger from '@/logger';
import * as DocumentPicker from 'expo-document-picker';
export type SQLiteDatabase = any;
const sqlPromise = initSqlJs({
  locateFile: (file) => `https://sql.js.org/dist/${file}`,
});

export async function openDatabaseAsync(databaseName: string, options?: any): Promise<SQLiteDatabase> {
  const SQL = await sqlPromise;
  const savedData = await loadFromIndexedDB(databaseName);
  const db = savedData ? new SQL.Database(savedData) : new SQL.Database();

  return {
    withTransactionAsync: async (task: () => Promise<void>) => {
      try {
        // TODO: fails with no transaction is active
        // db.exec('BEGIN TRANSACTION');
        await task();
        // db.exec('COMMIT');
        void saveToIndexedDB(db, databaseName);
      } catch (e) {
        console.error('rollback', e);
        // db.exec('ROLLBACK');
        throw e;
      }
    },
    execAsync: async (source: string): Promise<void> => {
      db.exec(source);
      void saveToIndexedDB(db, databaseName);
    },
    runAsync: async (source: string, params: BindParams): Promise<any> => {
      db.run(source, params);
      const result = {
        lastInsertRowId: db.exec('SELECT last_insert_rowid()')[0].values[0][0] as number,
        changes: db.getRowsModified(),
      };
      void saveToIndexedDB(db, databaseName);
      return result;
    },
    getAllAsync: async <T>(source: string, params: BindParams): Promise<T[]> => {
      const stmt = db.prepare(source);
      stmt.bind(params);
      const results = [];
      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }
      stmt.free();
      return results;
    },
    getFirstAsync: async <T>(source: string, params: any): Promise<T> => {
      const stmt = db.prepare(source);
      stmt.bind(params);
      stmt.step();
      const result = stmt.getAsObject();
      stmt.free();

      return result as T;
    },
    closeAsync: async () => {
      db.close();
    },
    export: () => {
      return db.export();
    },
    import: async (data: Uint8Array) => {
      await saveToIndexedDBBA(data, databaseName);
    },
  };
}

export const backupDatabase = async (db: SQLiteDatabase, backupName: string) => {
  try {
    const fileContent = await db.export();
    const blob = new Blob([fileContent], { type: 'application/x-sqlite3' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = backupName;
    link.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    logger.error('Failed to backup', err);
  }
};

export const restoreDatabase = async (db: SQLiteDatabase) => {
  try {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';

    return new Promise<void>((resolve, reject) => {
      input.onchange = async (event: any) => {
        const file = event.target.files[0];
        if (!file) {
          resolve(undefined);
          return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const fileContent = e.target?.result as ArrayBuffer | null;
            if (!fileContent) {
              reject('Corrupted file!');
              return;
            }

            const uint8Array = new Uint8Array(fileContent);
            // @ts-ignore
            await db.import(uint8Array);
            resolve(undefined);
          } catch (error) {
            reject(error?.message || 'Unknown error!');
          }
        };

        reader.onerror = () => {
          reject('Error reading the file!');
        };

        reader.readAsArrayBuffer(file);
      };

      input.click();
    });
  } catch (err) {
    logger.error('Failed to backup', err);
  }
};
