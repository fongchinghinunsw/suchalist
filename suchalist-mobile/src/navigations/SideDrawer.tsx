import {useNavigationTheme} from '@/hooks/useNavigationTheme';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/home/HomeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
// import PurchaseScreen from '@/screens/purchase/PurchaseScreen';

const DrawerNavigator = createDrawerNavigator();

export default function SideDrawer() {
  const {textColor, backgroundColor, pressColor} = useNavigationTheme();

  return (
    <DrawerNavigator.Navigator
      initialRouteName="DrawerHome"
      screenOptions={{
        swipeEnabled: false,
        drawerType: 'front',
        drawerActiveBackgroundColor: backgroundColor,
        drawerActiveTintColor: textColor,
        drawerInactiveTintColor: textColor,
        headerPressColor: pressColor,
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
      {/* <DrawerNavigator.Screen name="Purchase" component={PurchaseScreen} /> */}
      <DrawerNavigator.Screen name="Settings" component={SettingsScreen} />
    </DrawerNavigator.Navigator>
  );
}
