import { Task } from '@common/types/task';
import Text from '@renderer/components/base/Text';
import { selectTheme } from '@renderer/stores/theme';
import { getBorderColorClassName } from '@renderer/utils/styles/borderColor';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

type Props = {
  task: Task;
};

export default function TaskDetails({ task }: Props) {
  const theme = useSelector(selectTheme);

  return (
    <div
      className={clsx(
        'w-[40%] h-full border rounded-xl p-4 bg-white',
        getBorderColorClassName(theme, 400)
      )}
    >
      <Text size="large">{task.title}</Text>
    </div>
  );
}
