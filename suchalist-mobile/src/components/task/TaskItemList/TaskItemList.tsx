import {TaskWithDueDate} from '@/stores/tasks/types';
import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CompletedTaskItemList from './internal/CompletedTaskItemList';
import TaskItemGroupedList from './internal/TaskItemGroupedList';
import TaskItemUngroupedList from './internal/TaskItemUngroupedList';
import Divider from '@/components/base/Divider';
import AddTaskItem from './internal/AddTaskItem';
import {isTaskWithDueDate, Task} from '@/services/task-service/types';

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
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
