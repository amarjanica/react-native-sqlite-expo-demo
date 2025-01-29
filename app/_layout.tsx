import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import React from 'react';
import AppDataProvider from '@/data/providers/AppDataProvider';
import store from '@/store';
import { Provider as ReduxProvider } from 'react-redux';

const Root = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ReduxProvider store={store}>
          <AppDataProvider>
            <Slot />
          </AppDataProvider>
        </ReduxProvider>
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
