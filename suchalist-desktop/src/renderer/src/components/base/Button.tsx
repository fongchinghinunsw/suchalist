import { selectTheme, Theme } from '@renderer/stores/theme';
import { UnreachableError } from '@renderer/utils/UnreachableError';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

type ButtonTone = 'normal' | 'neutral' | 'danger';
type ButtonMode = 'text' | 'outlined' | 'contained';
type ButtonColor = Theme | 'gray';

type Props = {
  children: string;
  mode: ButtonMode;
  tone?: ButtonTone;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  onClick: () => void;
};

export default function Button({
  children,
  mode,
  tone = 'normal',
  disabled = false,
  loading,
  className,
  textClassName,
  onClick
}: Props) {
  const theme = useSelector(selectTheme);
  const color = getColor(theme, tone);

  const baseStyles =
    'inline-flex items-center justify-center font-semibold text-base rounded-md transition-opacity';
  const styles = getStyles(color)[mode];
  const disabledStyles = {
    text: 'text-gray-300',
    outlined: 'border-2 border-gray-300 text-gray-300 px-3 py-1.5',
    contained: 'bg-gray-300 text-white px-3 py-1.5'
  };

  return (
    <button
      className={twMerge(
        clsx(
          baseStyles,
          disabled ? disabledStyles[mode] : styles,
          !disabled && 'hover:opacity-80 active:opacity-60',
          className
        )
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={clsx(textClassName)}>{loading ? 'Loading...' : children}</span>
    </button>
  );
}

function getColor(theme: Theme, tone: ButtonTone): ButtonColor {
  switch (tone) {
    case 'normal':
      return theme;
    case 'neutral':
      return 'gray';
    case 'danger':
      return 'red';
    default:
      throw new UnreachableError(tone);
  }
}

function getStyles(color: ButtonColor) {
  switch (color) {
    case 'blue':
      return {
        text: 'text-blue-500',
        outlined: 'border-2 border-blue-500 text-blue-500 px-3 py-1.5',
        contained: 'bg-blue-500 text-white px-3 py-1.5'
      };
    case 'green':
      return {
        text: 'text-green-500',
        outlined: 'border-2 border-green-500 text-green-500 px-3 py-1.5',
        contained: 'bg-green-500 text-white px-3 py-1.5'
      };
    case 'red':
      return {
        text: 'text-red-500',
        outlined: 'border-2 border-red-500 text-red-500 px-3 py-1.5',
        contained: 'bg-red-500 text-white px-3 py-1.5'
      };
    case 'yellow':
      return {
        text: 'text-yellow-500',
        outlined: 'border-2 border-yellow-500 text-yellow-500 px-3 py-1.5',
        contained: 'bg-yellow-500 text-white px-3 py-1.5'
      };
    case 'purple':
      return {
        text: 'text-purple-500',
        outlined: 'border-2 border-purple-500 text-purple-500 px-3 py-1.5',
        contained: 'bg-purple-500 text-white px-3 py-1.5'
      };
    case 'gray':
      return {
        text: 'text-gray-500',
        outlined: 'border-2 border-gray-500 text-gray-500 px-3 py-1.5',
        contained: 'bg-gray-500 text-white px-3 py-1.5'
      };
    default:
      throw new UnreachableError(color);
  }
}
