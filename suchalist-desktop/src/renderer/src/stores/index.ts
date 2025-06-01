import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { notificationReducer } from './notification';
import { tasksReducer } from './tasks/tasks';
import { themeReducer } from './theme';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  theme: themeReducer,
  notification: notificationReducer
});

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
