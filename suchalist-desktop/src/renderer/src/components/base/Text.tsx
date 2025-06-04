import { selectTheme } from '@/stores/theme';
import { Shade } from '@/types/styles';
import { UnreachableError } from '@/utils/UnreachableError';
import { getTextColorClassName } from '@/utils/styles/textColor';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

type TextSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

type Props = {
  size: TextSize;
  shade?: Shade;
  className?: string;
  children: string;
};

export default function Text({ size, shade = 400, className, children }: Props) {
  const theme = useSelector(selectTheme);

  return (
    <div
      className={twMerge(
        clsx(getFontSizeClassName(size), getTextColorClassName(theme, shade), className)
      )}
    >
      {children}
    </div>
  );
}

function getFontSizeClassName(size: TextSize) {
  switch (size) {
    case 'xlarge':
      return 'text-xl';
    case 'large':
      return 'text-lg';
    case 'medium':
      return 'text-md';
    case 'small':
      return 'text-sm';
    case 'xsmall':
      return 'text-xs';
    default:
      throw new UnreachableError(size);
  }
}
