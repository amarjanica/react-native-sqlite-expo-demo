import { TaskClient } from '@/taskClient/types';

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
