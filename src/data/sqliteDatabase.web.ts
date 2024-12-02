import { BindParams } from 'sql.js';
import initSqlJs from 'sql.js';
export type SQLiteDatabase = any;
const sqlPromise = initSqlJs({
  locateFile: (file) => `https://sql.js.org/dist/${file}`,
});

export async function openDatabaseAsync(databaseName: string, options?: any): Promise<SQLiteDatabase> {
  const SQL = await sqlPromise;

  const db = new SQL.Database();
  return {
    withTransactionAsync: async (task: () => Promise<void>) => {
      try {
        db.exec('BEGIN');
        await task();
        db.exec('COMMIT');
      } catch (e) {
        console.error('rollback', e);
        db.exec('ROLLBACK');
        throw e;
      }
    },
    execAsync: async (source: string): Promise<void> => {
      db.exec(source);
    },
    runAsync: async (source: string, params: BindParams): Promise<any> => {
      db.run(source, params);
      return {
        lastInsertRowId: db.exec('SELECT last_insert_rowid()')[0].values[0][0] as number,
        changes: db.getRowsModified(),
      };
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
