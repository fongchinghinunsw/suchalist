import {useSelector} from 'react-redux';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';
import {StyleSheet, Text as ReactNativeText, TextProps} from 'react-native';
import {getColor, Shade} from '@/constants/styles';

type TextSize =
  | 'xxlarge'
  | 'xlarge'
  | 'large'
  | 'medium'
  | 'small'
  | 'xsmall'
  | 'xxsmall';

type TextTone = 'inheritTheme' | 'neutral';

type Props = {
  shade?: Shade;
  size?: TextSize;
  tone?: TextTone;
} & TextProps;

export default function Text({
  shade = 400,
  size = 'medium',
  tone = 'inheritTheme',
  children,
  style,
  ...otherProps
}: Props) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyle(theme, shade, size, tone);

  return (
    <ReactNativeText {...otherProps} style={[styles.text, style]}>
      {children}
    </ReactNativeText>
  );
}

const getFontSize = (size: TextSize) => {
  switch (size) {
    case 'xxlarge':
      return 24;
    case 'xlarge':
      return 21;
    case 'large':
      return 18;
    case 'medium':
      return 15;
    case 'small':
      return 12;
    case 'xsmall':
      return 9;
    case 'xxsmall':
      return 6;
  }
};

const getTheme = (tone: TextTone, theme: Theme) => {
  switch (tone) {
    case 'inheritTheme':
      return theme;
    case 'neutral':
      return 'neutral';
  }
};

const getStyle = (
  theme: Theme,
  shade: Shade,
  size: TextSize,
  tone: TextTone,
) => {
  const resultTheme = getTheme(tone, theme);
  return StyleSheet.create({
    text: {
      color: getColor(resultTheme, shade),
      fontSize: getFontSize(size),
    },
  });
};
