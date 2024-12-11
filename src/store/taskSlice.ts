import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskClient } from '@/taskClient/types';
import { Task } from '@/types';
import { RootState } from '@/store/index';

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
  async ({ tasksClient, taskName }: { tasksClient: TaskClient; taskName: string }, thunkApi) => {
    const task = await tasksClient.add(taskName);
    thunkApi.dispatch(addTask({ task }));
  }
);

const removeTaskHandler = createAsyncThunk(
  'tasks/remove',
  async ({ tasksClient, id }: { tasksClient: TaskClient; id: Task['id'] }, thunkApi) => {
    await tasksClient.delete(id);
    thunkApi.dispatch(removeTask({ id }));
  }
);

export { addTaskHandler, initializeTasks, removeTaskHandler };

export default taskSlice;
