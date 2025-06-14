import { Indicator, Root } from '@radix-ui/react-checkbox';
import { selectTheme, Theme } from '@renderer/stores/theme';
import { getBorderColorClassName } from '@renderer/utils/styles/borderColor';
import { UnreachableError } from '@renderer/utils/UnreachableError';
import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';

type Props = {
  id: string;
  name: string;
  label: string;
  isChecked: boolean;
  onCheckedChange: () => void;
};

export default function Checkbox({ id, name, label, isChecked, onCheckedChange }: Props) {
  const theme = useSelector(selectTheme);

  return (
    <Root
      className={clsx(
        'h-4 w-4 border rounded-sm',
        getCheckedBackgroundColor(theme),
        getBorderColorClassName(theme, 400)
      )}
      checked={isChecked}
      onCheckedChange={onCheckedChange}
    >
      <Indicator className="flex justify-center items-center">
        <FaCheck size={10} className="text-white" />
      </Indicator>
    </Root>
  );
}

function getCheckedBackgroundColor(theme: Theme) {
  switch (theme) {
    case 'blue':
      return 'data-[state=checked]:bg-blue-400';
    case 'green':
      return 'data-[state=checked]:bg-green-400';
    case 'red':
      return 'data-[state=checked]:bg-red-400';
    case 'yellow':
      return 'data-[state=checked]:bg-yellow-400';
    case 'purple':
      return 'data-[state=checked]:bg-purple-400';
    default:
      throw new UnreachableError(theme);
  }
}
