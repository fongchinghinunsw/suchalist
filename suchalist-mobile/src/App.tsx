import React, {useEffect} from 'react';

import store, {persistor} from '@/stores';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {MenuProvider} from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';
import {Provider as ReduxStoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootStack from './navigations/RootStack';
import {DAILY_REMINDER_CHANNEL_ID} from './stores/notification';
import {tasksActions} from './stores/tasks/tasks';
import {getTasksState} from './stores/tasks/utils/utils';

export default function App(): React.JSX.Element {
  const initialize = async () => {
    // Hydrate initial state
    const state = store.getState();

    const initialState = await getTasksState(state.tasks.resources);
    store.dispatch(tasksActions.hydrate(initialState));

    if (Platform.OS === 'ios') {
      notifee.requestPermission();
    } else if (Platform.OS === 'android') {
      notifee.createChannel({
        id: DAILY_REMINDER_CHANNEL_ID,
        name: 'Daily Reminder',
        importance: AndroidImportance.HIGH,
        sound: 'default',
        vibration: true,
      });
    }

    SplashScreen.hide();
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <ReduxStoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={{dark: false}}>
          <MenuProvider>
            <GestureHandlerRootView>
              <BottomSheetModalProvider>
                <NavigationContainer>
                  <RootStack />
                </NavigationContainer>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </MenuProvider>
        </PaperProvider>
      </PersistGate>
    </ReduxStoreProvider>
  );
}
