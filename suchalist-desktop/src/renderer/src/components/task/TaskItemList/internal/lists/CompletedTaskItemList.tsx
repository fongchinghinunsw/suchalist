import { Task } from '@common/types/task';
import { selectTheme } from '@renderer/stores/theme';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItemUngroupedList from './TaskItemUngroupedList';

type Props = {
  tasks: Task[];
};

export default function CompletedTaskItemList(props: Props) {
  const theme = useSelector(selectTheme);

  const [isTasksVisible, setIsTasksVisible] = useState(false);

  const toggleTasks = () => {
    setIsTasksVisible(!isTasksVisible);
  };

  const buttonText = isTasksVisible ? 'Hide Completed Tasks' : 'Show Completed Tasks';

  return (
    <>
      <div>
        <button>{buttonText}</button>
      </div>
      <div>
        <TaskItemUngroupedList {...props} />
      </div>
    </>
  );
}
