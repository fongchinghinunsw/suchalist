import IconButton from '@renderer/components/base/IconButton';
import { IoSettingsOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router';

export default function Footer() {
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="fixed bottom-0 left-0 w-[25%] h-15 bg-gray-100 flex flex-row justify-end items-center overflow-auto px-4 py-2">
      <IconButton Icon={IoSettingsOutline} size={32} onClick={goToSettings} />
    </div>
  );
}
