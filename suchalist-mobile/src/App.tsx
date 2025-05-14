import React from 'react';

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
import {getFakeTasksState} from './stores/tasks/utils';

export default function App(): React.JSX.Element {
  const initialize = async () => {
    // Hydrate initial fake state only if not already persisted
    const state = store.getState();
    const hasData = Object.keys(state.tasks.listsMap).length > 0;

    if (!hasData) {
      const initialState = await getFakeTasksState();
      store.dispatch(tasksActions.hydrate(initialState));
    }

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

  return (
    <ReduxStoreProvider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={initialize}>
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
