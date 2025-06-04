import { Theme } from '@renderer/stores/theme';
import { getBackgroundColorClassName } from '@renderer/utils/styles/backgroundColor';
import clsx from 'clsx';

type Props = {
  color: Theme;
  onClick?: () => void;
};

export default function ColorBox({ color, onClick }: Props) {
  return (
    <div
      className={clsx('w-4 h-4 cursor-pointer', getBackgroundColorClassName(color, 500))}
      onClick={onClick}
    />
  );
}
