/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import RootStack from './navigations/RootStack';
import {DrawerProvider} from './hooks/useDrawer';
import PushNotification, {Importance} from 'react-native-push-notification';
import {DAILY_REMINDER_CHANNEL_ID} from './stores/notification';
import {Platform} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import store, {persistor} from './stores';
import {Provider as ReduxStoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

PushNotification.createChannel(
  {
    channelId: DAILY_REMINDER_CHANNEL_ID,
    channelName: 'Daily Reminder',
    soundName: 'default',
    importance: Importance.HIGH,
  },
  created => console.log(`Channel created: ${created}`), // true the first time, false later
);

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});

export default function App(): React.JSX.Element {
  return (
    <ReduxStoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <DrawerProvider>
                <NavigationContainer>
                  <RootStack />
                </NavigationContainer>
              </DrawerProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </PaperProvider>
      </PersistGate>
    </ReduxStoreProvider>
  );
}
