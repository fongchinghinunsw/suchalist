import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {tasksReducer} from './tasks';
import persistStore from 'redux-persist/es/persistStore';
import {notificationReducer} from './notification';
import {themeReducer} from './theme';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['tasks', 'theme', 'notification'],
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
  theme: themeReducer,
  notification: notificationReducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default store;
