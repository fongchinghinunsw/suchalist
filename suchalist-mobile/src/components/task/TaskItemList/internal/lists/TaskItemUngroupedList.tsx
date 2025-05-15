import {Task} from '@/services/task-service/types';
import {sortTasks} from '@/utils/task/sort';
import React from 'react';
import {View} from 'react-native';
import TaskItem from '../TaskItem/TaskItem';
import {styles} from './styles';

type Props = {
  tasks: Task[];
  onTaskItemPress: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
  onUncompleteTask: (id: string) => void;
};

export default function TaskItemUngroupedList({
  tasks,
  onTaskItemPress,
  onDeleteTask,
  onCompleteTask,
  onUncompleteTask,
}: Props) {
  const sortedTasks = sortTasks(tasks);

  return (
    <View style={styles.container}>
      {sortedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onPress={onTaskItemPress}
          onDeleteTask={onDeleteTask}
          onCompleteTask={onCompleteTask}
          onUncompleteTask={onUncompleteTask}
        />
      ))}
    </View>
  );
}
