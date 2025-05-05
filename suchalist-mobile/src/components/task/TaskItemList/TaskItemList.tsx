import {Task, TaskWithDueDate} from '@/stores/tasks/types';
import {isTaskWithDueDate} from '@/stores/tasks/utils';
import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CompletedTaskItemList from './CompletedTaskItemList';
import TaskItemGroupedList from './TaskItemGroupedList';
import TaskItemUngroupedList from './TaskItemUngroupedList';
import Divider from '@/components/base/Divider';
import AddTaskItem from '../AddTaskItem';

type Props = {
  tasks: Task[];
  setIsCompleted: (id: string, isCompleted: boolean) => void;
  showAddTaskDrawer: (defaultDate: Date) => void;
  onTaskItemPress: (task: Task) => void;
  onAddTask: (task: {title: string}) => void;
  onRemoveTask: (id: string) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export default function TaskItemList({
  tasks,
  setIsCompleted,
  showAddTaskDrawer,
  onTaskItemPress,
  onAddTask,
  onRemoveTask,
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
    <ScrollView contentContainerStyle={styles.container} onScroll={onScroll}>
      <AddTaskItem onAddTask={onAddTask} />
      <TaskItemUngroupedList
        tasks={tasksWithoutDueDate}
        setIsCompleted={setIsCompleted}
        onTaskItemPress={onTaskItemPress}
        onRemoveTask={onRemoveTask}
      />
      <TaskItemGroupedList
        tasks={tasksWithDueDate}
        setIsCompleted={setIsCompleted}
        onTaskItemPress={onTaskItemPress}
        showAddTaskDrawer={showAddTaskDrawer}
        onRemoveTask={onRemoveTask}
      />
      <Divider />
      <CompletedTaskItemList
        tasks={completedTasks}
        setIsCompleted={setIsCompleted}
        onTaskItemPress={onTaskItemPress}
        onRemoveTask={onRemoveTask}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
  },
});
