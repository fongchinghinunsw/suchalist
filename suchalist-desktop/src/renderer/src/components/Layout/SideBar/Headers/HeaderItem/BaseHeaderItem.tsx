import Text from '@renderer/components/base/Text';
import { IconType } from 'react-icons';

type Props = {
  icon: {
    Icon: IconType;
    size: number;
  };
  title: string;
  onClick: () => void;
};

export default function BaseHeaderItem({ icon, title, onClick }: Props) {
  const { Icon, size } = icon;
  return (
    <div className="flex justify-between items-center p-2" onClick={onClick}>
      <div className="flex items-center gap-2">
        <Icon size={size} />
        <Text size="medium">{title}</Text>
      </div>
    </div>
  );
}
