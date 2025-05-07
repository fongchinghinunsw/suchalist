import BottomSheet from '@/components/base/BottomSheet';
import TaskItemList from '@/components/task/TaskItemList/TaskItemList';
import {getColor} from '@/constants/styles';
import {RootStackParamList} from '@/navigations/RootStack';
import {RootState} from '@/stores';
import {selectCurrentTasks, tasksActions} from '@/stores/tasks/tasks';
import {NewTask, Task} from '@/stores/tasks/types';
import {Theme} from '@/stores/theme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCallback, useRef, useState} from 'react';
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import ReanimatedDrawerLayout, {
  DrawerLayoutMethods,
  DrawerPosition,
  DrawerType,
} from 'react-native-gesture-handler/ReanimatedDrawerLayout';
import {useDispatch, useSelector} from 'react-redux';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import FAB from './components/FAB';
import ForceAppUpdateModal from './components/ForceAppUpdateModal';
import {DrawerPage} from './components/TaskListDrawer/TaskListDrawer';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const backgroundImage = require('@/assets/images/golden-gate-bridge.jpg');

export default function HomeScreen() {
  const drawerRef = useRef<DrawerLayoutMethods>(null);

  const tasks = useSelector(selectCurrentTasks);
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

  const removeTask = useCallback(
    (id: string) => {
      dispatch(tasksActions.removeTask(id));
    },
    [dispatch],
  );

  const setIsCompleted = (id: string, isCompleted: boolean) => {
    dispatch(tasksActions.setIsCompleted({id, isCompleted}));
    // dispatch(tasksActions.removePastFinishedTasks());
  };

  // useEffect(() => {
  // dispatch(tasksActions.removePastFinishedTasks());
  // }, [dispatch]);

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

  const horizontalSwipeGesture = Gesture.Pan()
    .onUpdate(e => {
      if (
        Math.abs(e.translationX) > Math.abs(e.translationY) &&
        e.translationX > 20
      ) {
        // Horizontal right swipe
        drawerRef.current?.openDrawer();
      }
    })
    .runOnJS(true);

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}>
      <GestureDetector gesture={horizontalSwipeGesture}>
        <ReanimatedDrawerLayout
          ref={drawerRef}
          renderNavigationView={() => <DrawerPage drawerRef={drawerRef} />}
          drawerPosition={DrawerPosition.LEFT}
          drawerType={DrawerType.FRONT}
          edgeWidth={0}>
          <ForceAppUpdateModal />

          <View style={styles.overlay} />

          <View style={styles.container}>
            <View style={styles.tasksListContainer}>
              <TaskItemList
                tasks={tasks}
                setIsCompleted={setIsCompleted}
                showAddTaskDrawer={(date: Date) => onAddTaskForDate(date)}
                onTaskItemPress={(task: Task) =>
                  navigation.push('TaskDetails', {task})
                }
                onAddTask={addTask}
                onRemoveTask={removeTask}
                onScroll={onScroll}
              />
            </View>

            <BottomSheet ref={bottomSheetModalRef}>
              <AddTaskForm
                defaultDate={defaultDate}
                onAddTask={addTask}
                onClose={hideAddTaskForm}
              />
            </BottomSheet>
            <FAB
              label="Add Task"
              isExtended={isFABExtended}
              onPress={onPressFAB}
            />
          </View>
        </ReanimatedDrawerLayout>
      </GestureDetector>
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
