import { UnreachableError } from '@renderer/utils/UnreachableError';

type Size = 1 | 2 | 3;

type Props = {
  size: Size;
};

export default function Spacer({ size }: Props) {
  return <div className={getHeight(size)} />;
}

function getHeight(size: Size) {
  switch (size) {
    case 1:
      return 'h-1';
    case 2:
      return 'h-2';
    case 3:
      return 'h-3';
    default:
      throw new UnreachableError(size);
  }
}
