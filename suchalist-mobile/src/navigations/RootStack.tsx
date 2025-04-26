import {createStackNavigator} from '@react-navigation/stack';
import SideDrawer from './SideDrawer';
import TaskDetailsScreen from '../screens/home/TaskDetailsScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../stores';
import {Theme} from '../stores/theme';
import {getColor} from '../constants/styles';
import {Task} from '../stores/tasks';

export type RootStackParamList = {
  Home: undefined;
  TaskDetails: {
    task: Task;
  };
};

const Stack = createStackNavigator();

export default function RootStack() {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const textColor = getColor(theme, 900);
  const backgroundColor = getColor(theme, 400);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={SideDrawer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: textColor,
          headerBackTitleStyle: {
            color: textColor,
          },
        }}
      />
    </Stack.Navigator>
  );
}
