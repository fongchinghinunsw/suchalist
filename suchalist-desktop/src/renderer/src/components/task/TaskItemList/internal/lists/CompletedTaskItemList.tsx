import { CompletedTask, Task } from '@common/types/task';
import Button from '@renderer/components/base/Button';
import SoundPlayer from '@renderer/components/SoundPlayer';
import { useState } from 'react';
import TaskItemUngroupedList from './TaskItemUngroupedList';

type Props = {
  tasks: CompletedTask[];
  onSelectTask: (task: Task) => void;
  onStarTask: (task: Task, isStarred: boolean) => void;
  onToggleTaskIsCompleted: (task: Task, isCompleted: boolean) => void;
};

export default function CompletedTaskItemList(props: Props) {
  const [isTasksVisible, setIsTasksVisible] = useState(false);

  const toggleTasks = () => {
    SoundPlayer.play('bubble_pop');
    setIsTasksVisible(!isTasksVisible);
  };

  const buttonText = isTasksVisible ? 'Hide Completed Tasks' : 'Show Completed Tasks';

  return (
    <div className="py-4">
      <div className="flex justify-center pb-3">
        <Button mode="contained" onClick={toggleTasks}>
          {buttonText}
        </Button>
      </div>

      {isTasksVisible && <TaskItemUngroupedList {...props} />}
    </div>
  );
}
