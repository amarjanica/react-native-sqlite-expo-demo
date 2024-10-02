import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import React from 'react';
import migrations from '../migrations';
import DbMigrationRunner from '@/DbMigrationRunner';
import logger from '@/logger';
import { SQLiteDatabase } from 'expo-sqlite';
import SQLiteProvider from '@/SQLiteProvider';

const Root = () => {
  const [ready, setReady] = React.useState(false);
  const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
    try {
      await new DbMigrationRunner(db).apply(migrations);
      logger.log('All migrations applied.');
      setReady(true);
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <SQLiteProvider
          databaseName="test.db"
          onInit={migrateDbIfNeeded}>
          {ready && <Slot />}
        </SQLiteProvider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  keyboardView: {
    flex: 1,
  },
});

export default Root;
