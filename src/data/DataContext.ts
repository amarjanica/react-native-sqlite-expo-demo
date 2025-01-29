import React from 'react';
import { DataContextValue } from '@/data/types';

export const DataContext = React.createContext<DataContextValue | null>(null);

export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
