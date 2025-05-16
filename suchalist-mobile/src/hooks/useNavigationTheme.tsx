import {getColor} from '@/constants/styles';
import {selectTheme} from '@/stores/theme';
import {useSelector} from 'react-redux';

export function useNavigationTheme() {
  const theme = useSelector(selectTheme);

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
