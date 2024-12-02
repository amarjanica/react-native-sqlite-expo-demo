import { TaskClient } from '@/taskClient/types';
import React from 'react';

type Value = {
  tasksClient: TaskClient;
};

export const DataContext = React.createContext<Value | null>(null);

export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
