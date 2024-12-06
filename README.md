# React Native Expo Demo

React Native Expo app showcasing SQLite integration, database migrations, and web support with AsyncStorage and IndexedDB. 
Includes integration tests and a multi-platform demo (Android & web).

# Chapters
## 1. Database migrations and integration testing
I made first version of the app to showcase how you can to database migrations 
and configure integration tests to be run in a Node.js environment.
Read more about it in my blog post on [expo sqlite migrations and integration testing](https://www.amarjanica.com/bridging-the-gap-between-expo-sqlite-and-node-js/)
or [watch my YT tutorial](https://youtu.be/5OBi4JtlGfY).
[Codebase](https://github.com/amarjanica/react-native-sqlite-expo-demo/tree/98c355d5b1fa065a5ec6585273232908edfe50ec)

## 2. Web support with SQLite, AsyncStorage and IndexedDB
I've added web support to the app, so it can run on the web. You can dynamically switch between
different storage types: SQLite, AsyncStorage and IndexedDB. SQLite is supported on the web via
[sql.js](https://github.com/sql-js/sql.js/).
Read more about it in my blog post on [expo sqlite, indexeddb and asyncstorage on the web](https://www.amarjanica.com/expo-sqlite-on-the-web-localstorage-indexeddb-and-sql-js/)
or [watch my YT tutorial](https://youtu.be/JZYXtOgqEbc).

# App Screenshot
<p align="center">
<img src="preview.png" alt="App Screenshot example" height="300"/>
</p>

# Run it on Android
I've tested this demo natively on android emulator.
```sh
npm i
# runs on expo go
npm run go:android
# or run on expo dev client
npm run dev:android
```

# Web App Screenshot
<p align="center">
<img src="preview-web.png" alt="Web app Screenshot example" height="300"/>
</p>

# Run it on the web
```sh
npm i
npm run web
```

# Tests
Tests don't need an emulator. They're just `jest` tests that you can run with `npm test` like any nodejs project.
