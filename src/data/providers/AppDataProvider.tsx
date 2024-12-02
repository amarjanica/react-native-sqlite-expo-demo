import { DataProviderProps, PersistenceType } from '@/data/types';
import React from 'react';
import LocalStorageDataProvider from '@/data/providers/LocalStorageDataProvider';
import SQLiteDataProvider from '@/data/providers/SQLiteDataProvider';
import { DataContext } from '@/data/DataContext';
import IndexedDBDataProvider from '@/data/providers/IndexedDBDataProvider';

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

const AppDataProvider: React.FC<{
  children: React.ReactNode;
  persistenceType: PersistenceType;
}> = ({ children, persistenceType }) => {
  return (
    <PersistenceProviderWrapper persistenceType={persistenceType}>
      {(props) => {
        return <DataContext.Provider value={{ tasksClient: props.taskClient }}>{children}</DataContext.Provider>;
      }}
    </PersistenceProviderWrapper>
  );
};

export default AppDataProvider;
