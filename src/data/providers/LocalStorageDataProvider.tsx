import { DataProviderProps } from '@/data/types';
import React from 'react';
import LocalStorageTaskClient from '@/clients/LocalStorageTaskClient';
import LocalStorageOpsClient from '@/clients/LocalStorageOpsClient';

const LocalStorageDataProvider: React.FC<DataProviderProps> = ({ children }) => {
  return <>{children({ taskClient: new LocalStorageTaskClient(), opsClient: new LocalStorageOpsClient() })}</>;
};

export default LocalStorageDataProvider;
