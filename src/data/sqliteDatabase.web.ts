import { BindParams } from 'sql.js';
import initSqlJs from 'sql.js';
import { loadFromIndexedDB, saveToIndexedDB } from '@/data/indexedDatabase';
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
  };
}
