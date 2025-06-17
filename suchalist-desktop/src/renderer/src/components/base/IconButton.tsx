import clsx from 'clsx';
import { IconType } from 'react-icons';

type Props = {
  Icon: IconType;
  size: number;
  className?: string;
  onClick?: () => void;
};

export default function IconButton({ Icon, size, onClick, className }: Props) {
  return (
    <Icon
      tabIndex={0}
      size={size}
      className={clsx('cursor-pointer', className)}
      onClick={onClick}
    />
  );
}
