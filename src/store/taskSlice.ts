import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskClient } from '@/clients/types';
import { Task } from '@/types';
import { RootState } from '@/store/index';
import { resetState } from '@/store/globalReset';

const taskSlice = createSlice({
  initialState: [],
  name: 'tasks',
  reducers: {
    initialize: (state, action: PayloadAction<{ tasks: Task[] }>) => {
      return action.payload.tasks;
    },
    addTask: (state, action: PayloadAction<{ task: Task }>) => {
      state.push(action.payload.task);
    },
    removeTask: (state, action: PayloadAction<{ id: Task['id'] }>) => {
      return state.filter((task) => task.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetState, () => []);
  },
});

const { initialize, addTask, removeTask } = taskSlice.actions;

export const selectTasksState = (state: RootState) => state.tasks;
export const selectTask = (id: Task['id']) =>
  createSelector(selectTasksState, (state) => state.find((it) => it.id === id));

const initializeTasks = createAsyncThunk('tasks/initialize', async (taskClient: TaskClient, thunkApi) => {
  const tasks = await taskClient.tasks();
  thunkApi.dispatch(initialize({ tasks }));
});

const addTaskHandler = createAsyncThunk(
  'tasks/add',
  async ({ taskClient, taskName }: { taskClient: TaskClient; taskName: string }, thunkApi) => {
    const task = await taskClient.add(taskName);
    thunkApi.dispatch(addTask({ task }));
  }
);

const removeTaskHandler = createAsyncThunk(
  'tasks/remove',
  async ({ taskClient, id }: { taskClient: TaskClient; id: Task['id'] }, thunkApi) => {
    await taskClient.delete(id);
    thunkApi.dispatch(removeTask({ id }));
  }
);

export { addTaskHandler, initializeTasks, removeTaskHandler };

export default taskSlice;
