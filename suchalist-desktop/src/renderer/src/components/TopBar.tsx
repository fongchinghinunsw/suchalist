import { selectTheme } from '@renderer/stores/theme';
import { getBackgroundColorClassName } from '@renderer/utils/styles/backgroundColor';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

export default function TopBar() {
  const theme = useSelector(selectTheme);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 h-11 [-webkit-app-region:drag]',
        getBackgroundColorClassName(theme, 400)
      )}
    />
  );
}
