import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Settings } from '@/types';
import { PersistenceType } from '@/data/types';
import { Platform } from 'react-native';
import { RootState } from '@/store/index';
import { resetState } from './globalReset';

const initialState: Settings = {
  persistenceType: Platform.select({ web: PersistenceType.indexedDB, default: PersistenceType.sqlite }),
};
const settingsSlice = createSlice({
  initialState,
  name: 'settings',
  reducers: {
    changePersistence: (state, action: PayloadAction<{ value: PersistenceType }>) => {
      return { ...state, persistenceType: action.payload.value };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetState, () => initialState);
  },
});

export const { changePersistence } = settingsSlice.actions;
export const selectSettings = (state: RootState) => state.settings;
export const selectedPersistence = createSelector(selectSettings, (it) => it.persistenceType);
export default settingsSlice;
