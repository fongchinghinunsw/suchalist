import Text from '@renderer/components/base/Text';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

type Props = {
  icon: {
    Icon: IconType;
    size: number;
  };
  title: string;
  rightSection: ReactNode;
  onClick: () => void;
};

export default function BaseHeaderItem({ icon, title, rightSection, onClick }: Props) {
  const { Icon, size } = icon;
  return (
    <div className="flex justify-between items-center p-2 cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-2">
        <Icon size={size} />
        <Text size="medium">{title}</Text>
      </div>
      {rightSection}
    </div>
  );
}
