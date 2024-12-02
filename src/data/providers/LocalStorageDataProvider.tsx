import { DataProviderProps } from '@/data/types';
import React from 'react';
import LocalStorageTaskClient from '@/taskClient/LocalStorageTaskClient';

const LocalStorageDataProvider: React.FC<DataProviderProps> = ({ children }) => {
  return <>{children({ taskClient: new LocalStorageTaskClient() })}</>;
};

export default LocalStorageDataProvider;
