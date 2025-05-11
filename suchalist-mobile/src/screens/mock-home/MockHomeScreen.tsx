import Text from '@/components/base/Text';
import TaskItemList from '@/components/task/TaskItemList/TaskItemList';
import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import {TASKS} from './fake';

const backgroundImage = require('@/assets/images/golden-gate-bridge.jpg');

export default function MockHomeScreen() {
  const noOp = () => {};

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}>
      <View style={styles.tasksListContainer}>
        <TaskItemList
          tasks={TASKS}
          setIsCompleted={noOp}
          showAddTaskDrawer={noOp}
          onTaskItemPress={noOp}
          onAddTask={noOp}
          onRemoveTask={noOp}
          onScroll={noOp}
        />
      </View>
    </ImageBackground>
  );
}

export function renderHeaderRight(onDone: () => void) {
  return (
    <Pressable
      onPress={() => {
        onDone();
      }}
      style={styles.headerRight}>
      <Text shade={900}>Done</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  tasksListContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerRight: {
    marginRight: 16,
    padding: 4,
  },
});
