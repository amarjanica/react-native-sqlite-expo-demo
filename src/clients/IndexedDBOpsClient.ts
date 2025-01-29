import { OpsClient } from '@/clients/types';
import { IDBPDatabase } from 'idb';
import { IndexedDBSchema } from '@/data/types';

class IndexedDBOpsClient implements OpsClient {
  constructor(private db: IDBPDatabase<IndexedDBSchema>) {}

  async clear(): Promise<void> {
    const tx = this.db.transaction(this.db.objectStoreNames, 'readwrite');

    const clearedStores = [...this.db.objectStoreNames].map((it) => tx.objectStore(it).clear());
    await Promise.all([...clearedStores, tx.done]);
  }

  backup(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  restore(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default IndexedDBOpsClient;
