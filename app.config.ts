/* eslint-env node */
import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  jsEngine: 'hermes',
  scheme: 'demo',
  name: 'react-native-sqlite-expo-demo',
  slug: 'react-native-sqlite-expo-demo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  extra: {
    dbName: 'test',
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    package: 'com.amarjanica.reactnativesqliteexpodemo',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
