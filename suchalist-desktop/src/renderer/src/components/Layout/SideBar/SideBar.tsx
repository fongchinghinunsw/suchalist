import IconButton from '@renderer/components/base/IconButton';
import { IoSettingsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router';

type Props = {
  children: React.ReactNode;
};

export function SideBar({ children }: Props) {
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate('/settings');
  };

  return (
    <aside className="w-[20%] overflow-auto bg-purple-300 relative">
      {children}
      <IconButton
        Icon={IoSettingsOutline}
        size={32}
        onClick={goToSettings}
        className="absolute bottom-0 right-0"
      />
    </aside>
  );
}
