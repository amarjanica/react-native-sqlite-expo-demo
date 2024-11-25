# React Native SQLite Expo Demo

A demo application built with Expo and React Native, showcasing the integration of SQLite 
using expo-sqlite within an expo-router project. This app serves as an example of:
- Database SQLite Migration
- Integration Testing: Run integration tests for expo-sqlite in a Node.js environment.
The app functions as a simple "CRUD" (Create, Read, Delete) tasks manager.

Read more about it in my blog post on [expo sqlite migrations and integration testing](https://www.amarjanica.com/bridging-the-gap-between-expo-sqlite-and-node-js/)
or [watch my YT tutorial](https://youtu.be/5OBi4JtlGfY).

# App Screenshot
<p align="center">
<img src="preview.png" alt="App Screenshot example" height="300"/>
</p>

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
