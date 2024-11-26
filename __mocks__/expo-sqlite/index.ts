import { SQLiteRunResult, SQLiteVariadicBindParams } from 'expo-sqlite/src/SQLiteStatement';
import { RunResult } from 'sqlite3';

const sqlite3 = require('sqlite3').verbose();

export const openDatabaseAsync = (_name: string) => prepareDb();

const prepareDb = () => {
  const db = new sqlite3.Database(':memory:');

  return {
    withTransactionAsync: async (task: () => Promise<void>) => {
      try {
        await db.exec('BEGIN');
        await task();
        await db.exec('COMMIT');
      } catch (e) {
        await db.exec('ROLLBACK');
        throw e;
      }
    },
    execAsync: async (source: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        db.exec(source, (result: RunResult, err: Error | null) => {
          if (err) {
            reject(err);
          } else {
            resolve(undefined);
          }
        });
      });
    },
    runAsync: async (source: string, ...params: SQLiteVariadicBindParams): Promise<SQLiteRunResult> => {
      return new Promise((resolve, reject) => {
        db.run(source, params, (result: RunResult, err: Error | null) => {
          if (err) {
            reject(err);
          } else {
            resolve(
              result
                ? ({
                    lastInsertRowId: result.lastID,
                    changes: result.changes,
                  } as SQLiteRunResult)
                : null
            );
          }
        });
      });
    },
    getAllAsync: async <T>(source: string, ...params: SQLiteVariadicBindParams): Promise<any[]> => {
      return new Promise<any[]>((resolve, reject) => {
        // @ts-ignore
        db.all<T>(source, params, (err: Error | null, rows: any[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    },
    getFirstAsync: async <T>(stmt: string, params: any): Promise<T> => {
      return new Promise((resolve, reject) => {
        // @ts-ignore
        db.get<T>(stmt, params, (err: Error | null, row: T) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    },
    closeAsync: async () => {
      db.close();
    },
    prepareAsync: async (source: string) => {
      const stmt = db.prepare(source);

      return {
        executeAsync: async (params: any) => {
          return new Promise((resolve, reject) => {
            stmt.run(params, function (err: Error | null) {
              if (err) {
                reject(err);
              } else {
                resolve({
                  lastInsertRowId: this.lastID,
                  changes: this.changes,
                });
              }
            });
          });
        },
        finalizeAsync: async () => {
          return new Promise((resolve, reject) => {
            stmt.finalize((err: Error | null) => {
              if (err) {
                reject(err);
              } else {
                resolve(undefined);
              }
            });
          });
        },
      };
    },
  };
};
