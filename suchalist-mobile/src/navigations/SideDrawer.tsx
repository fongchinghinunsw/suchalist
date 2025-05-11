import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/home/HomeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import {useSelector} from 'react-redux';
import {Theme} from '../stores/theme';
import {RootState} from '../stores';
import {getColor} from '../constants/styles';

const DrawerNavigator = createDrawerNavigator();

export default function SideDrawer() {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const textColor = getColor(theme, 900);
  const backgroundColor = getColor(theme, 400);

  return (
    <DrawerNavigator.Navigator
      initialRouteName="DrawerHome"
      screenOptions={{
        swipeEnabled: false,
        drawerType: 'front',
        drawerActiveBackgroundColor: backgroundColor,
        drawerActiveTintColor: textColor,
        drawerInactiveTintColor: textColor,
        headerTitle: 'Home',
        headerPressColor: getColor(theme, 300),
        headerTintColor: textColor,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTitleStyle: {
          color: textColor,
        },
      }}>
      <DrawerNavigator.Screen
        name="DrawerHome"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <DrawerNavigator.Screen name="Settings" component={SettingsScreen} />
    </DrawerNavigator.Navigator>
  );
}
