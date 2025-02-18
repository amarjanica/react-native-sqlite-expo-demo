import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAppDispatch } from '@/store';
import Header from '@/Header';
import globalStyles from '@/globalStyles';
import { clearData } from '@/store/globalReset';
import { useDataContext } from '@/data/DataContext';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { opsClient } = useDataContext();

  return (
    <View style={globalStyles.root}>
      <Header showBack={true}>
        <Text style={globalStyles.headerText}>Settings</Text>
      </Header>
      <View style={styles.settingRow}>
        <View style={globalStyles.divider} />
        <Text>Data management</Text>
        <Button
          title="Clear data"
          onPress={() => {
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
