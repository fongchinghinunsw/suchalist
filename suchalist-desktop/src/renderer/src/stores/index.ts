import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { tasksReducer } from './tasks/tasks';
import { themeReducer } from './theme';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme']
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  theme: themeReducer
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default store;
