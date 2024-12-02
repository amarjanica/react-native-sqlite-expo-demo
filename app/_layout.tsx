import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, KeyboardAvoidingView, Platform, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import AppDataProvider from '@/data/providers/AppDataProvider';
import { PersistenceType } from '@/data/types';

const Root = () => {
  const [persistenceType, setPersistenceType] = React.useState<PersistenceType>(
    Platform.select({ web: PersistenceType.indexedDB, default: PersistenceType.sqlite })
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <AppDataProvider persistenceType={persistenceType}>
          <Text style={styles.title}>
            Persistence type: {persistenceType}, OS: {Platform.OS}
          </Text>
          <View style={styles.buttons}>
            <Button
              title={PersistenceType.localstorage}
              onPress={() => setPersistenceType(PersistenceType.localstorage)}></Button>
            <Button
              title={PersistenceType.indexedDB}
              onPress={() => setPersistenceType(PersistenceType.indexedDB)}></Button>
            <Button
              title={PersistenceType.sqlite}
              onPress={() => setPersistenceType(PersistenceType.sqlite)}></Button>
          </View>
          <Slot />
        </AppDataProvider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: '50%',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  keyboardView: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
  },
});

export default Root;
