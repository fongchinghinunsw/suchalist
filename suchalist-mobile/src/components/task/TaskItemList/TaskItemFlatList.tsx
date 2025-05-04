import {Task} from '@/stores/tasks/types';
import {sortTasks} from '@/utils/task/sort';
import React from 'react';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import TaskItem from '../TaskItem';

type Props = {
  tasks: Task[];
  setIsCompleted: (id: string, isCompleted: boolean) => void;
  onEndReached: () => void;
  onTaskItemPress: (task: Task) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export default function TaskItemFlatList({
  tasks,
  setIsCompleted,
  onEndReached,
  onTaskItemPress,
  onScroll,
}: Props) {
  const sortedTasks = sortTasks(tasks);

  return (
    <FlatList
      scrollEnabled={false}
      data={sortedTasks}
      onScroll={onScroll}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <Animated.View layout={LinearTransition}>
          <TaskItem
            task={item}
            setIsCompleted={setIsCompleted}
            onPress={onTaskItemPress}
          />
        </Animated.View>
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
    />
  );
}
