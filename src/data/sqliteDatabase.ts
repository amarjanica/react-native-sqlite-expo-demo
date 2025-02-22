import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import logger from '@/logger';

export const backupDatabase = async (db: SQLiteDatabase, backupName: string) => {
  try {
    await db.execAsync('PRAGMA wal_checkpoint(FULL)');
    const appPath = FileSystem.documentDirectory;
    const dbPath = `${appPath}/SQLite/${db.databaseName}`;
    const backupPath = `${appPath}/SQLite/${backupName}`;

    await FileSystem.copyAsync({
      from: dbPath,
      to: backupPath,
    });

    await Sharing.shareAsync(backupPath, { mimeType: 'application/x-sqlite3' });
    await FileSystem.deleteAsync(backupPath, { idempotent: true });
  } catch (err) {
    logger.error('Failed to backup', err);
  }
};

export const restoreDatabase = async (db: SQLiteDatabase) => {
  try {
    const appPath = FileSystem.documentDirectory;
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.canceled) {
      return;
    }
    const backupPath = result.assets[0].uri;
    if (!(await FileSystem.getInfoAsync(backupPath)).exists) {
      return;
    }
    await db.execAsync('PRAGMA wal_checkpoint(FULL)');
    await db.closeAsync();
    const dbPath = `${appPath}/SQLite/${db.databaseName}`;
    await FileSystem.deleteAsync(`${dbPath}-wal`, { idempotent: true });
    await FileSystem.deleteAsync(`${dbPath}-shm`, { idempotent: true });

    await FileSystem.copyAsync({
      to: dbPath,
      from: backupPath,
    });
  } catch (err) {
    logger.error('Failed to backup', err);
  }
};

export { openDatabaseAsync, SQLiteDatabase };
