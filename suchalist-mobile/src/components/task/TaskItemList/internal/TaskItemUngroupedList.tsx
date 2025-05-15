import {Task} from '@/services/task-service/types';
import {sortTasks} from '@/utils/task/sort';
import React from 'react';
import {View} from 'react-native';
import TaskItem from './TaskItem';
import {styles} from './styles';

type Props = {
  tasks: Task[];
  onTaskItemPress: (task: Task) => void;
  onRemoveTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
  onUncompleteTask: (id: string) => void;
};

export default function TaskItemUngroupedList({
  tasks,
  onTaskItemPress,
  onRemoveTask,
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
          onRemoveTask={onRemoveTask}
          onCompleteTask={onCompleteTask}
          onUncompleteTask={onUncompleteTask}
        />
      ))}
    </View>
  );
}
