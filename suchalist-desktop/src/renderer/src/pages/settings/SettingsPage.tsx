import Text from '@/components/base/Text';
import ColorBox from '@renderer/components/ColorBox';
import { THEMES } from '@renderer/constants/styles';
import { Theme, themeActions } from '@renderer/stores/theme';
import { useDispatch } from 'react-redux';

export default function SettingsPage() {
  const dispatch = useDispatch();

  const setTheme = (theme: Theme) => {
    dispatch(themeActions.setTheme(theme));
  };

  return (
    <main className="flex-1 p-10">
      <div className="p-10 bg-white/50 rounded-xl">
        <Text size="large" className="text-black font-bold">
          App Appearance
        </Text>
        <Text size="small" className="text-black">
          Set the color and background for your TODO list.
        </Text>
        <div className="flex gap-3 mt-4">
          {THEMES.map((theme) => (
            <ColorBox key={theme} color={theme} onClick={() => setTheme(theme)} />
          ))}
        </div>
      </div>
    </main>
  );
}
