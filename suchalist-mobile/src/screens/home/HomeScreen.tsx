import BottomSheet from '@/components/base/BottomSheet';
import TaskItemList from '@/components/task/TaskItemList';
import {getColor} from '@/constants/styles';
import {RootStackParamList} from '@/navigations/RootStack';
import {RootState} from '@/stores';
import {NewTask, Task, tasksActions} from '@/stores/tasks/tasks';
import {Theme} from '@/stores/theme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import EmptyTaskMessage from './components/EmptyTaskMessage';
import FAB from './components/FAB';
import ForceAppUpdateModal from './components/ForceAppUpdateModal';
import AddTaskItem from '@/components/task/AddTaskItem';

const backgroundImage = require('@/assets/images/golden-gate-bridge.jpg');

export default function HomeScreen() {
  const tasks = useSelector<RootState, Task[]>(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyles(theme);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const addTask = useCallback(
    (task: NewTask) => {
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

  const [defaultDate, setDefaultDate] = useState<Date | undefined>(undefined);

  const onAddTaskForDate = (date: Date) => {
    setDefaultDate(date);
    bottomSheetModalRef.current?.present();
  };

  // FAB
  const [isFABExtended, setIsFABExtended] = useState(true);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(event?.nativeEvent.contentOffset?.y) ?? 0;

    setIsFABExtended(currentScrollPosition <= 0);
  };

  const onPressFAB = () => {
    setDefaultDate(undefined);
    bottomSheetModalRef.current?.present();
  };

  // Bottom Sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const hideAddTaskForm = () => {
    bottomSheetModalRef.current?.close();
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}>
      <ForceAppUpdateModal />

      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.tasksListContainer}>
          <AddTaskItem />
          {tasks.length > 0 ? (
            <TaskItemList
              tasks={tasks}
              setIsCompleted={setIsCompleted}
              onEndReached={() => console.log('reached')}
              showAddTaskDrawer={(date: Date) => onAddTaskForDate(date)}
              onTaskItemPress={(task: Task) =>
                navigation.push('TaskDetails', {task})
              }
              onScroll={onScroll}
            />
          ) : (
            <EmptyTaskMessage />
          )}
        </View>

        <BottomSheet ref={bottomSheetModalRef}>
          <AddTaskForm
            defaultDate={defaultDate}
            onAddTask={addTask}
            onClose={hideAddTaskForm}
          />
        </BottomSheet>

        <FAB label="Add Task" isExtended={isFABExtended} onPress={onPressFAB} />
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
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
