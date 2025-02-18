import { openDB } from 'idb';
import { Database } from 'sql.js';

const DB_NAME = 'testmigrationsv1';
const STORE_NAME = 'databases';

const idbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME);
    }
  },
});
export async function loadFromIndexedDB(dbName: string): Promise<Uint8Array | null> {
  const idb = await idbPromise;
  return await idb.get(STORE_NAME, dbName);
}
export async function saveToIndexedDB(db: Database, dbName: string) {
  const dbData = db.export();
  const idb = await idbPromise;
  await idb.put(STORE_NAME, dbData, dbName);
}
