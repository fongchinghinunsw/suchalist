import React, {useEffect} from 'react';

import store, {persistor} from '@/stores';
// import {DAILY_REMINDER_CHANNEL_ID} from '@/stores/notification';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {PaperProvider} from 'react-native-paper';
// import PushNotification, {Importance} from 'react-native-push-notification';
import {Provider as ReduxStoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootStack from './navigations/RootStack';

// PushNotification.createChannel(
//   {
//     channelId: DAILY_REMINDER_CHANNEL_ID,
//     channelName: 'Daily Reminder',
//     soundName: 'default',
//     importance: Importance.HIGH,
//     vibrate: true,
//   },
//   created => console.log(`Channel created: ${created}`), // true the first time, false later
// );

// PushNotification.configure({
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification);
//   },
//   requestPermissions: Platform.OS === 'ios',
// });

export default function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
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
