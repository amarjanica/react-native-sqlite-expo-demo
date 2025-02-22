import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAppDispatch } from '@/store';
import Header from '@/Header';
import globalStyles from '@/globalStyles';
import { clearData } from '@/store/globalReset';
import { useDataContext } from '@/data/DataContext';
import { SQLiteContext } from '@/data/SQLiteProvider';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { opsClient } = useDataContext();
  const dbCtx = useContext(SQLiteContext);

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
        <Button
          title="Import"
          onPress={async () => {
            await opsClient.restore();
            await dbCtx.reload();
          }}
        />
        <Button
          title="Export"
          onPress={async () => {
            await opsClient.backup('testbackup.sqlite');
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
