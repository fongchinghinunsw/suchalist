import {Task} from '@/stores/tasks/types';
import {sortTasks} from '@/utils/task/sort';
import React from 'react';
import {View} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import TaskItem from '../TaskItem';

type Props = {
  tasks: Task[];
  setIsCompleted: (id: string, isCompleted: boolean) => void;
  onTaskItemPress: (task: Task) => void;
};

export default function TaskItemFlatList({
  tasks,
  setIsCompleted,
  onTaskItemPress,
}: Props) {
  const sortedTasks = sortTasks(tasks);

  return (
    <View>
      {sortedTasks.map(task => (
        <Animated.View key={task.id} layout={LinearTransition}>
          <TaskItem
            task={task}
            setIsCompleted={setIsCompleted}
            onPress={onTaskItemPress}
          />
        </Animated.View>
      ))}
    </View>
  );
}
