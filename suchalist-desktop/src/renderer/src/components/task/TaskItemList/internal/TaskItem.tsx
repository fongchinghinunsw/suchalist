import Text from '@/components/base/Text';
import { selectTheme, Theme } from '@/stores/theme';
import { Task } from '@common/types/task';
import Checkbox from '@renderer/components/base/form/Checkbox';
import SoundPlayer from '@renderer/components/SoundPlayer';
import { getTextColorClassName } from '@renderer/utils/styles/textColor';
import { UnreachableError } from '@renderer/utils/UnreachableError';
import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

type Props = {
  task: Task;
  onSelectTask: (task: Task) => void;
  onStarTask: (task: Task, isStarred: boolean) => void;
  onToggleTaskIsCompleted: (task: Task, isCompleted: boolean) => void;
};

export default function TaskItem({
  task,
  onSelectTask,
  onStarTask,
  onToggleTaskIsCompleted
}: Props) {
  const theme = useSelector(selectTheme);

  const onClick = () => onSelectTask(task);

  const toggleIsStarred: MouseEventHandler = (event) => {
    event.stopPropagation();
    onStarTask(task, !task.isStarred);
  };

  const toggleIsCompleted: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    if (task.isCompleted) {
      SoundPlayer.play('pop');
    } else {
      SoundPlayer.play('ding');
    }
    onToggleTaskIsCompleted(task, !task.isCompleted);
  };

  return (
    <div
      className={clsx(
        'border-2 rounded-lg bg-white p-2 flex justify-between items-center',
        getBorderColor(theme)
      )}
      onClick={onClick}
    >
      <Text size="small">{task.title}</Text>
      <div className="flex gap-2">
        {task.isStarred ? (
          <IoStar className={getTextColorClassName(theme, 600)} onClick={toggleIsStarred} />
        ) : (
          <IoStarOutline className={getTextColorClassName(theme, 600)} onClick={toggleIsStarred} />
        )}
        <Checkbox
          id="name"
          name="name"
          label="Name"
          isChecked={task.isCompleted}
          onClick={toggleIsCompleted}
        />
      </div>
    </div>
  );
}

function getBorderColor(theme: Theme) {
  switch (theme) {
    case 'blue':
      return 'border-blue-400';
    case 'green':
      return 'border-green-400';
    case 'red':
      return 'border-red-400';
    case 'yellow':
      return 'border-yellow-400';
    case 'purple':
      return 'border-purple-400';
    default:
      throw new UnreachableError(theme);
  }
}
