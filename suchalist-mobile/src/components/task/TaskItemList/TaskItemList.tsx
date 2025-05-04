import Text from '@/components/base/Text';
import {Task, TaskWithDueDate} from '@/stores/tasks/types';
import {isTaskWithDueDate} from '@/stores/tasks/utils';
import React from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import TaskItemGroupedList from './TaskItemGroupedList';
import TaskItemUngroupedList from './TaskItemUngroupedList';

type Props = {
  tasks: Task[];
  setIsCompleted: (id: string, isCompleted: boolean) => void;
  showAddTaskDrawer: (defaultDate: Date) => void;
  onTaskItemPress: (task: Task) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export default function TaskItemList({
  tasks,
  setIsCompleted,
  showAddTaskDrawer,
  onTaskItemPress,
  onScroll,
}: Props) {
  const completedTasks: Task[] = [];
  const tasksWithoutDueDate: Task[] = [];
  const tasksWithDueDate: TaskWithDueDate[] = [];

  tasks.forEach(task => {
    if (task.isCompleted) {
      completedTasks.push(task);
      return;
    }

    if (isTaskWithDueDate(task)) {
      tasksWithDueDate.push(task);
      return;
    }

    tasksWithoutDueDate.push(task);
  });

  return (
    <ScrollView onScroll={onScroll}>
      <TaskItemUngroupedList
        tasks={tasksWithoutDueDate}
        setIsCompleted={setIsCompleted}
        onTaskItemPress={onTaskItemPress}
      />
      <TaskItemGroupedList
        tasks={tasksWithDueDate}
        setIsCompleted={setIsCompleted}
        onTaskItemPress={onTaskItemPress}
        showAddTaskDrawer={showAddTaskDrawer}
      />
      <Text>==========</Text>
      <TaskItemUngroupedList
        tasks={completedTasks}
        setIsCompleted={setIsCompleted}
        onTaskItemPress={onTaskItemPress}
      />
    </ScrollView>
  );
}
