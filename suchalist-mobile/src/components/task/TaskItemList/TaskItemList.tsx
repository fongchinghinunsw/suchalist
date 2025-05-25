import Divider from '@/components/base/Divider';
import {
  isCompletedTask,
  isTaskWithDueDate,
  List,
  Task,
} from '@/services/task-service/types';
import {tasksActions} from '@/stores/tasks/tasks';
import {CompletedTask, TaskWithDueDate} from '@/stores/tasks/types';
import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import AddTaskItem from './internal/AddTaskItem';
import CompletedTaskItemList from './internal/lists/CompletedTaskItemList';
import TaskItemGroupedList from './internal/lists/TaskItemGroupedList';
import TaskItemUngroupedList from './internal/lists/TaskItemUngroupedList';

type Props = {
  list: List;
  showAddTaskItem?: boolean;
  showAddTaskDrawer: (defaultDate: Date) => void;
  onTaskItemPress: (task: Task) => void;
  onAddTask: (task: {title: string}) => void;
  onDeleteTask: (task: Task) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export default function TaskItemList({
  list,
  showAddTaskItem = true,
  showAddTaskDrawer,
  onTaskItemPress,
  onAddTask,
  onDeleteTask,
  onScroll,
}: Props) {
  const dispatch = useDispatch();

  const completedTasks: CompletedTask[] = [];
  const tasksWithoutDueDate: Task[] = [];
  const tasksWithDueDate: TaskWithDueDate[] = [];

  list.tasks.forEach(task => {
    if (isCompletedTask(task)) {
      completedTasks.push(task);
      return;
    }

    if (isTaskWithDueDate(task)) {
      tasksWithDueDate.push(task);
      return;
    }

    tasksWithoutDueDate.push(task);
  });

  tasksWithDueDate.sort(
    (l1, l2) => new Date(l1.dueDate).getTime() - new Date(l2.dueDate).getTime(),
  );

  completedTasks.sort(
    (l1, l2) =>
      new Date(l2.completedAt).getTime() - new Date(l1.completedAt).getTime(),
  );

  const onStarTask = (task: Task, isStarred: boolean) => {
    dispatch(tasksActions.setIsStarred({task, isStarred}));
  };

  const onCompleteTask = (task: Task) => {
    dispatch(tasksActions.setIsCompleted({task, isCompleted: true}));
  };

  const onUncompleteTask = (task: Task) => {
    dispatch(
      tasksActions.setIsCompleted({
        task,
        isCompleted: false,
      }),
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} onScroll={onScroll}>
      {showAddTaskItem && <AddTaskItem onAddTask={onAddTask} />}
      <TaskItemUngroupedList
        tasks={tasksWithoutDueDate}
        onTaskItemPress={onTaskItemPress}
        onStarTask={onStarTask}
        onDeleteTask={onDeleteTask}
        onCompleteTask={onCompleteTask}
        onUncompleteTask={onUncompleteTask}
      />
      <TaskItemGroupedList
        tasks={tasksWithDueDate}
        showAddTaskDrawer={showAddTaskDrawer}
        showAddTaskButton={showAddTaskItem}
        onTaskItemPress={onTaskItemPress}
        onStarTask={onStarTask}
        onDeleteTask={onDeleteTask}
        onCompleteTask={onCompleteTask}
        onUncompleteTask={onUncompleteTask}
      />
      <Divider />
      <CompletedTaskItemList
        tasks={completedTasks}
        onTaskItemPress={onTaskItemPress}
        onStarTask={onStarTask}
        onDeleteTask={onDeleteTask}
        onCompleteTask={onCompleteTask}
        onUncompleteTask={onUncompleteTask}
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
