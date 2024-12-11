import { combineReducers, configureStore, Middleware, PayloadAction } from '@reduxjs/toolkit';
import tasksSlice from './taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import logger from '@/logger';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

const rootReducer = combineReducers({
  [tasksSlice.name]: tasksSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const middlewares: Middleware[] = [];

if (__DEV__) {
  const customLoggerMiddleware: Middleware = (_r) => (next) => (action: PayloadAction) => {
    logger.log(`Action Dispatched: ${action.type}`);
    return next(action);
  };
  middlewares.push(customLoggerMiddleware);
}

const enhancers: any[] = [];

if (__DEV__) {
  enhancers.push(devToolsEnhancer());
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }).concat(middlewares),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancers),
  devTools: __DEV__,
});

type AppStore = typeof store;
type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
