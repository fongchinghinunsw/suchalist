import {Task} from '@/services/task-service/types';
import {sortTasks} from '@/utils/task/sort';
import React from 'react';
import {View} from 'react-native';
import TaskItem from '../TaskItem/TaskItem';
import {styles} from './styles';

type Props = {
  tasks: Task[];
  onTaskItemPress: (task: Task) => void;
  onStarTask: (task: Task, isStarred: boolean) => void;
  onDeleteTask: (listId: string, taskId: string) => void;
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
  const sortedTasks = sortTasks(tasks);

  return (
    <View style={styles.container}>
      {sortedTasks.map(task => (
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
