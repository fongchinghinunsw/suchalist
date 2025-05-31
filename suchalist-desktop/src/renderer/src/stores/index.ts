import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { notificationReducer } from './notification';
import { tasksReducer } from './tasks/tasks';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  notification: notificationReducer
});

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
