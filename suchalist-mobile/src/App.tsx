import React, {useEffect} from 'react';

import store, {persistor} from '@/stores';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {PaperProvider} from 'react-native-paper';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {Provider as ReduxStoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootStack from './navigations/RootStack';
import {DAILY_REMINDER_CHANNEL_ID} from './stores/notification';
import {Platform} from 'react-native';

export default function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();

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
  }, []);

  return (
    <ReduxStoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={{dark: false}}>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <NavigationContainer>
                <RootStack />
              </NavigationContainer>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </PaperProvider>
      </PersistGate>
    </ReduxStoreProvider>
  );
}
