import React from 'react';
import { View, Text, StyleSheet, Platform, Button } from 'react-native';
import { enabledPersistenceTypes } from '@/config';
import { useAppDispatch, useAppSelector } from '@/store';
import { changePersistence, selectedPersistence } from '@/store/settingsSlice';
import Header from '@/Header';
import globalStyles from '@/globalStyles';
import { clearData } from '@/store/globalReset';
import { useDataContext } from '@/data/DataContext';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const persistenceType = useAppSelector(selectedPersistence);
  const { opsClient } = useDataContext();

  return (
    <View style={globalStyles.root}>
      <Header showBack={true}>
        <Text style={globalStyles.headerText}>Settings</Text>
      </Header>
      <View style={styles.settingRow}>
        <Text>
          Persistence type: {persistenceType}, OS: {Platform.OS}
        </Text>
        {enabledPersistenceTypes.map((value) => (
          <Button
            key={value}
            title={value}
            onPress={() => dispatch(changePersistence({ value }))}
          />
        ))}
        <View style={globalStyles.divider} />
        <Text>Clear Data</Text>
        <Button
          title="Clear data"
          onPress={() => {
            console.log('aha');
            dispatch(clearData({ opsClient }));
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingRow: {
    alignItems: 'flex-start',
    gap: 5,
    padding: 16,
  },
});

export default SettingsPage;
