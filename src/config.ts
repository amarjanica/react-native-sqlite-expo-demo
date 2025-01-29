import { Platform } from 'react-native';
import { PersistenceType } from '@/data/types';

export const dbName = 'test.db';
export const enabledPersistenceTypes = Platform.select({
  web: [PersistenceType.localstorage, PersistenceType.indexedDB, PersistenceType.sqlite],
  default: [PersistenceType.localstorage, PersistenceType.sqlite],
});
