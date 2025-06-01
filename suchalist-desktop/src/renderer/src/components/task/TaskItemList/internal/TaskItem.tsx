import Text from '@/components/base/Text';
import { selectTheme, Theme } from '@/stores/theme';
import { Task } from '@common/types/task';
import { getTextColorClassName } from '@renderer/utils/styles/textColor';
import { UnreachableError } from '@renderer/utils/UnreachableError';
import clsx from 'clsx';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

type Props = {
  task: Task;
};

export default function TaskItem({ task }: Props) {
  const theme = useSelector(selectTheme);

  return (
    <div
      className={clsx(
        'border-2 rounded-lg bg-white p-2 flex justify-between items-center',
        getBorderColor(theme)
      )}
    >
      <Text size="small">{task.title}</Text>
      {task.isStarred ? (
        <IoStar className={getTextColorClassName(theme, 600)} />
      ) : (
        <IoStarOutline className={getTextColorClassName(theme, 600)} />
      )}
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
