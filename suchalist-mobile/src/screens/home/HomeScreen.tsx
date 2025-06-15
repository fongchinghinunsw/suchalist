import BottomSheet from '@/components/base/BottomSheet';
import TaskItemList from '@/components/task/TaskItemList/TaskItemList';
import {getColor} from '@/constants/styles';
import {RootStackParamList} from '@/navigations/RootStack';
import {
  selectCurrentList,
  selectIsCurrentListGenerated,
  tasksActions,
} from '@/stores/tasks/tasks';
import {NewTask} from '@/stores/tasks/types';
import {selectBackgroundImage, selectTheme, Theme} from '@/stores/theme';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useCallback, useRef, useState} from 'react';
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';

import {Task} from '@/services/task-service/types';
import {useDispatch, useSelector} from 'react-redux';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import FAB from './components/FAB';
import ForceAppUpdateModal from './components/ForceAppUpdateModal';
import HeaderDrawerLayout from './components/HeaderDrawer/HeaderDrawerLayout';

export default function HomeScreen() {
  const currentList = useSelector(selectCurrentList);
  const dispatch = useDispatch();

  const isCurrentListGenerated = useSelector(selectIsCurrentListGenerated);

  const theme = useSelector(selectTheme);
  const styles = getStyles(theme);

  const backgroundImage = useSelector(selectBackgroundImage);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const addTask = useCallback(
    (task: NewTask) => {
      dispatch(tasksActions.addTask(task));
    },
    [dispatch],
  );

  const deleteTask = useCallback(
    (task: Task) => {
      dispatch(tasksActions.deleteTask({task}));
    },
    [dispatch],
  );

  const [defaultDate, setDefaultDate] = useState<Date | undefined>(undefined);

  const onAddTaskForDate = (date: Date) => {
    setDefaultDate(date);
    bottomSheetModalRef.current?.present();
  };

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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const hideAddTaskForm = () => {
    bottomSheetModalRef.current?.close();
  };

  const source =
    backgroundImage.type === 'uri'
      ? {uri: backgroundImage.uri}
      : backgroundImage.asset;

  return (
    <HeaderDrawerLayout>
      <ImageBackground
        source={source}
        resizeMode="cover"
        style={styles.background}>
        <ForceAppUpdateModal />

        {currentList && (
          <TaskItemList
            list={currentList}
            showAddTaskItem={!isCurrentListGenerated}
            showAddTaskDrawer={(date: Date) => onAddTaskForDate(date)}
            onTaskItemPress={(task: Task) =>
              navigation.push('TaskDetails', {task})
            }
            onAddTask={addTask}
            onDeleteTask={deleteTask}
            onScroll={onScroll}
          />
        )}

        {!isCurrentListGenerated && (
          <>
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
          </>
        )}
      </ImageBackground>
    </HeaderDrawerLayout>
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
