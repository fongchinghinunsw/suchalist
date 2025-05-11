import {useNavigationTheme} from '@/hooks/useNavigationTheme';
import MockHomeScreen, {
  renderHeaderRight,
} from '@/screens/mock-home/MockHomeScreen';
import {Task} from '@/stores/tasks/types';
import {createStackNavigator} from '@react-navigation/stack';
import TaskDetailsScreen from '../screens/task_details/TaskDetailsScreen';
import SideDrawer from './SideDrawer';
import {useDispatch} from 'react-redux';
import {themeActions} from '@/stores/theme';
import {ImageSourcePropType} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  TaskDetails: {
    task: Task;
  };
  MockHome: {
    onDone: () => void;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const {textColor, backgroundColor} = useNavigationTheme();
  const dispatch = useDispatch();

  const onBackgroundImageChange = (image: ImageSourcePropType) => {
    dispatch(themeActions.setBackgroundImage(image));
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor,
        },
      }}>
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
      <Stack.Screen
        name="MockHome"
        component={MockHomeScreen}
        options={({route}) => ({
          headerTintColor: textColor,
          headerTitleStyle: {
            color: textColor,
          },
          headerBackTitleStyle: {
            color: textColor,
          },
          headerLeft: () => null,
          headerTitle: 'Home',
          headerRight: () => renderHeaderRight(route.params.onDone),
        })}
      />
    </Stack.Navigator>
  );
}
