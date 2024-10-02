# React Native SQLite Expo Demo

A demo application built with Expo and React Native, showcasing the integration of SQLite 
using expo-sqlite within an expo-router project. This app demonstrates:
- Database SQLite Migration
- Integration Testing: Run integration tests for expo-sqlite in a Node.js environment.
The app is a simple "CRUD" without the "U" tasks manager.

![preview](preview.png "App Screenshot")


# Run it on Android
I've tested this demo only on android emulator.
```sh
npm i
# runs on expo go
npm run go:android
# or run on expo dev client
npm run dev:android
```

# Tests
Tests don't need an emulator. They're just `jest` tests that you can run with `npm test` like any nodejs project.
