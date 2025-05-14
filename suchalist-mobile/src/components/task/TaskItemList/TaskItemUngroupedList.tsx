import {Task} from '@/services/task-service/types';
import {sortTasks} from '@/utils/task/sort';
import React from 'react';
import {View} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import TaskItem from '../TaskItem';
import {styles} from './common';

type Props = {
  tasks: Task[];
  setIsCompleted: (id: string, isCompleted: boolean) => void;
  onTaskItemPress: (task: Task) => void;
  onRemoveTask: (id: string) => void;
};

export default function TaskItemUngroupedList({
  tasks,
  setIsCompleted,
  onTaskItemPress,
  onRemoveTask,
}: Props) {
  const sortedTasks = sortTasks(tasks);

  return (
    <View style={styles.container}>
      {sortedTasks.map(task => (
        <Animated.View key={task.id} layout={LinearTransition}>
          <TaskItem
            task={task}
            setIsCompleted={setIsCompleted}
            onPress={onTaskItemPress}
            onRemoveTask={onRemoveTask}
          />
        </Animated.View>
      ))}
    </View>
  );
}
