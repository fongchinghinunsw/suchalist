import {Task, TaskWithDueDate} from '@/stores/tasks/types';
import {isTaskWithDueDate} from '@/stores/tasks/utils';
import React from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import TaskItemPlainList from './TaskItemPlainList';
import TaskItemSectionList from './TaskItemSectionList';

type Props = {
  tasks: Task[];
  setIsCompleted: (id: string, isCompleted: boolean) => void;
  onEndReached: () => void;
  showAddTaskDrawer: (defaultDate: Date) => void;
  onTaskItemPress: (task: Task) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export default function TaskItemList({
  tasks,
  setIsCompleted,
  onEndReached,
  showAddTaskDrawer,
  onTaskItemPress,
  onScroll,
}: Props) {
  const tasksWithoutDueDate: Task[] = [];
  const tasksWithDueDate: TaskWithDueDate[] = [];

  tasks.forEach(task => {
    if (isTaskWithDueDate(task)) {
      tasksWithDueDate.push(task);
    } else {
      tasksWithoutDueDate.push(task);
    }
  });

  const plainListProps = {
    tasks: tasksWithoutDueDate,
    setIsCompleted,
    showAddTaskDrawer,
    onTaskItemPress,
  };

  const expandableListProps = {
    tasks: tasksWithDueDate,
    setIsCompleted,
    onEndReached,
    showAddTaskDrawer,
    onTaskItemPress,
    onScroll,
  };

  return (
    <>
      <TaskItemPlainList {...plainListProps} />
      <TaskItemSectionList {...expandableListProps} />
    </>
  );
}
