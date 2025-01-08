/* eslint-env node */
import { ExpoConfig } from '@expo/config-types';
import { coerce } from 'semver';
import pkg from './package.json';

const currentVersion = coerce(pkg.version);
const androidVersion = currentVersion.major * 10000 + currentVersion.minor * 100 + currentVersion.patch;
const expoVersion = pkg.version;

const config: ExpoConfig = {
  jsEngine: 'hermes',
  scheme: 'demo',
  name: 'react-native-sqlite-expo-demo',
  slug: 'react-native-sqlite-expo-demo',
  version: expoVersion,
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
    eas: {
      projectId: process.env.EXPO_PROJECT_ID,
    },
  },
  ios: {
    supportsTablet: true,
    buildNumber: expoVersion,
    bundleIdentifier: 'com.amarjanica.reactnativesqliteexpodemo',
  },
  android: {
    package: 'com.amarjanica.reactnativesqliteexpodemo',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    versionCode: androidVersion,
  },
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
