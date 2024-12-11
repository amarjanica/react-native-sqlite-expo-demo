import { DataProviderProps, PersistenceType } from '@/data/types';
import React from 'react';
import LocalStorageDataProvider from '@/data/providers/LocalStorageDataProvider';
import SQLiteDataProvider from '@/data/providers/SQLiteDataProvider';
import { DataContext } from '@/data/DataContext';
import IndexedDBDataProvider from '@/data/providers/IndexedDBDataProvider';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/store';
import { TaskClient } from '@/taskClient/types';
import { initializeTasks } from '@/store/taskSlice';

const PersistenceProviderWrapper: React.FC<DataProviderProps & { persistenceType: PersistenceType }> = ({
  persistenceType,
  ...props
}) => {
  const Component: React.FC<DataProviderProps> = {
    [PersistenceType.sqlite]: SQLiteDataProvider,
    [PersistenceType.indexedDB]: IndexedDBDataProvider,
    [PersistenceType.localstorage]: LocalStorageDataProvider,
  }[persistenceType];

  return <Component {...props} />;
};

const DataContextProvider: React.FC<React.PropsWithChildren<{ tasksClient: TaskClient }>> = ({
  tasksClient,
  children,
}) => {
  React.useEffect(() => {
    store.dispatch(initializeTasks(tasksClient));
  }, [tasksClient]);

  return (
    <DataContext.Provider value={{ tasksClient }}>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </DataContext.Provider>
  );
};

const AppDataProvider: React.FC<{
  children: React.ReactNode;
  persistenceType: PersistenceType;
}> = ({ children, persistenceType }) => {
  return (
    <PersistenceProviderWrapper persistenceType={persistenceType}>
      {(props) => <DataContextProvider tasksClient={props.taskClient}>{children}</DataContextProvider>}
    </PersistenceProviderWrapper>
  );
};

export default AppDataProvider;
