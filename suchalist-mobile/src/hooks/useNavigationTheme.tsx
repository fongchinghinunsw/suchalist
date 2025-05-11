import {useSelector} from 'react-redux';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';
import {getColor} from '@/constants/styles';

export function useNavigationTheme() {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

  const textColor = getColor(theme, 900);
  const backgroundColor = getColor(theme, 400);
  const pressColor = getColor(theme, 300);

  return {
    theme,
    textColor,
    backgroundColor,
    pressColor,
  };
}
