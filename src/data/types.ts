import { TaskClient } from '@/taskClient/types';
import React from 'react';

export enum PersistenceType {
  sqlite = 'sqlite',
  indexedDB = 'indexedDB',
  localstorage = 'localstorage',
}

export type DataProviderProps = {
  children: (props: { taskClient: TaskClient }) => React.ReactNode;
};

export type IndexedDBSchema = {
  tasks: {
    key: number;
    value: { id: number; task: string; createdAt: string; updatedAt: string };
  };
};
