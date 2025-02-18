import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { OpsClient } from '@/clients/types';

export const resetState = createAction('app/reset');

export const clearData = createAsyncThunk(
  'app/clearData',
  async ({ opsClient }: { opsClient: OpsClient }, thunkApi) => {
    await opsClient.clear();
    thunkApi.dispatch(resetState());
  }
);
