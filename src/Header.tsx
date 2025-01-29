import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import globalStyles from '@/globalStyles';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const Header: React.FC<{ children: React.ReactNode; showBack?: boolean }> = ({ children, showBack }) => {
  return (
    <View style={styles.root}>
      {showBack && (
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push('/');
            }
          }}>
          <Icon
            name="arrow-left"
            size={globalStyles.icon.fontSize}
            color={globalStyles.icon.color}
          />
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 5,
  },
});

export default Header;
