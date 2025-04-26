import Icon from '@react-native-vector-icons/ionicons';
import {useCallback, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AddTaskDrawer from '../../components/AddTaskDrawer';
import TaskItemList from '../../components/TaskItemList';
import {RootState} from '../../stores';
import {Task, tasksActions} from '../../stores/tasks';
import {Theme} from '../../stores/theme';
import {getColor} from '../../constants/styles';
import {useDrawer} from '../../hooks/useDrawer';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigations/RootStack';

const backgroundImage = require('../../assets/images/golden-gate-bridge.jpg');

export default function HomeScreen() {
  const tasks = useSelector<RootState, Task[]>(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyles(theme);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {registerDrawer, showDrawer, hideDrawer} = useDrawer();

  const addTask = useCallback(
    (task: Task) => {
      dispatch(tasksActions.addTask(task));
    },
    [dispatch],
  );

  const setIsCompleted = (id: string, isCompleted: boolean) => {
    dispatch(tasksActions.setIsCompleted({id, isCompleted}));
    dispatch(tasksActions.removePastFinishedTasks());
  };

  useEffect(() => {
    dispatch(tasksActions.removePastFinishedTasks());
  }, [dispatch]);

  useEffect(() => {
    registerDrawer('addTask', () => AddTaskDrawer);
  }, [registerDrawer]);

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}>
      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.tasksListContainer}>
          <TaskItemList
            tasks={tasks}
            setIsCompleted={setIsCompleted}
            onEndReached={() => console.log('reached')}
            showAddTaskDrawer={(defaultDate: Date) =>
              showDrawer('addTask', {
                defaultDate,
                onAddTask: addTask,
                onClose: hideDrawer,
              })
            }
            onTaskItemPress={(task: Task) =>
              navigation.push('TaskDetails', {task})
            }
          />
        </View>

        {/* Floating Plus Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() =>
            showDrawer('addTask', {
              onAddTask: addTask,
              onClose: hideDrawer,
            })
          }>
          <Icon name="add-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      justifyContent: 'center',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    tasksListContainer: {
      flex: 1,
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    fab: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      backgroundColor: getColor(theme, 600),
      borderRadius: 30,
      width: 56,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    drawer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 250,
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 12,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowOffset: {width: 0, height: -3},
      shadowRadius: 6,
    },
    drawerContent: {
      paddingHorizontal: 16,
    },
    drawerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 10,
      marginBottom: 12,
    },
    addButton: {
      backgroundColor: '#007AFF',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    addButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
};
