/* eslint-env node */
import {ExpoConfig} from '@expo/config-types';

const config: ExpoConfig = {
  "scheme": "demo",
  "name": "react-native-sqlite-expo-demo",
  "slug": "react-native-sqlite-expo-demo",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "userInterfaceStyle": "light",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "ios": {
    "supportsTablet": true
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#ffffff"
    }
  },
  "web": {
    "favicon": "./assets/favicon.png"
  },
  "plugins": [
    "expo-router"
  ]
}

export default config;
