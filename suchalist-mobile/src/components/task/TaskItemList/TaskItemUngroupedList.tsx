import {Task} from '@/services/task-service/types';
import {sortTasks} from '@/utils/task/sort';
import React from 'react';
import {View} from 'react-native';
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
        <TaskItem
          key={task.id}
          task={task}
          setIsCompleted={setIsCompleted}
          onPress={onTaskItemPress}
          onRemoveTask={onRemoveTask}
        />
      ))}
    </View>
  );
}
