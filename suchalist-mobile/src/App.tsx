import React from 'react';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Provider as ReduxStoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootStack from './navigations/RootStack';
import store, {persistor} from '@/stores';
import {DAILY_REMINDER_CHANNEL_ID} from '@/stores/notification';

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
