import { DataContextValue, DataProviderProps, PersistenceType } from '@/data/types';
import React from 'react';
import LocalStorageDataProvider from '@/data/providers/LocalStorageDataProvider';
import SQLiteDataProvider from '@/data/providers/SQLiteDataProvider';
import { DataContext } from '@/data/DataContext';
import IndexedDBDataProvider from '@/data/providers/IndexedDBDataProvider';

import { useAppDispatch, useAppSelector } from '@/store';
import { initializeTasks } from '@/store/taskSlice';
import { selectedPersistence } from '@/store/settingsSlice';

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

const DataContextProvider: React.FC<React.PropsWithChildren<DataContextValue>> = ({
  taskClient,
  opsClient,
  children,
}) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(initializeTasks(taskClient));
  }, [taskClient]);

  return <DataContext.Provider value={{ taskClient, opsClient }}>{children}</DataContext.Provider>;
};

const AppDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const persistenceType = useAppSelector(selectedPersistence);
  return (
    <PersistenceProviderWrapper persistenceType={persistenceType}>
      {(props) => (
        <DataContextProvider
          opsClient={props.opsClient}
          taskClient={props.taskClient}>
          {children}
        </DataContextProvider>
      )}
    </PersistenceProviderWrapper>
  );
};

export default AppDataProvider;
