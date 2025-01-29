import { OpsClient, TaskClient } from '@/clients/types';
import React from 'react';

export enum PersistenceType {
  sqlite = 'sqlite',
  indexedDB = 'indexedDB',
  localstorage = 'localstorage',
}

export type DataContextValue = {
  taskClient: TaskClient;
  opsClient: OpsClient;
};

export type DataProviderProps = {
  children: (props: DataContextValue) => React.ReactNode;
};

export type IndexedDBSchema = {
  tasks: {
    key: number;
    value: { id: number; task: string; createdAt: string; updatedAt: string };
  };
};
