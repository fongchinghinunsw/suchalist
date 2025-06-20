import {Task} from '@/services/task-service/types';
import React from 'react';
import {View} from 'react-native';
import TaskItem from '../TaskItem/TaskItem';
import {styles} from './styles';

type Props = {
  tasks: Task[];
  onTaskItemPress: (task: Task) => void;
  onStarTask: (task: Task, isStarred: boolean) => void;
  onDeleteTask: (task: Task) => void;
  onCompleteTask: (task: Task) => void;
  onUncompleteTask: (task: Task) => void;
};

export default function TaskItemUngroupedList({
  tasks,
  onTaskItemPress,
  onStarTask,
  onDeleteTask,
  onCompleteTask,
  onUncompleteTask,
}: Props) {
  return (
    <View style={styles.container}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onPress={onTaskItemPress}
          onStarTask={onStarTask}
          onDeleteTask={onDeleteTask}
          onCompleteTask={onCompleteTask}
          onUncompleteTask={onUncompleteTask}
        />
      ))}
    </View>
  );
}
