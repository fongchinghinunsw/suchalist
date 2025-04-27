import React from 'react';
import {Button as PaperButton} from 'react-native-paper';
import {Props as PaperButtonProps} from 'react-native-paper/lib/typescript/components/Button/Button';
import {useSelector} from 'react-redux';
import {getColor} from '@/constants/styles';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';
import {UnreachableError} from './UnreachableError';

type ButtonTone = 'danger';

type Props = PaperButtonProps & {
  mode: Extract<PaperButtonProps['mode'], 'text' | 'outlined' | 'contained'>;
  tone?: ButtonTone;
};

export default function Button({
  children,
  mode,
  tone,
  disabled,
  ...otherProps
}: Props) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const defaultStyleProps = disabled
    ? getDisabledStyleProps(mode)
    : getStyleProps(theme, mode, tone);

  return (
    <PaperButton {...defaultStyleProps} {...otherProps}>
      {children}
    </PaperButton>
  );
}

type StyleProps = {
  buttonColor?: Props['buttonColor'];
  textColor?: Props['textColor'];
  rippleColor?: Props['rippleColor'];
  style?: Props['style'];
};

const getStyleProps = (
  defaulTheme: Theme,
  mode: Props['mode'],
  tone?: ButtonTone,
): StyleProps => {
  const theme = tone === undefined ? defaulTheme : 'red';

  switch (mode) {
    case 'text':
      return {
        textColor: getColor(theme, 500),
      };
    case 'outlined':
      return {
        textColor: getColor(theme, 500),
        style: {
          borderColor: getColor(theme, 500),
          borderWidth: 2,
        },
      };
    case 'contained':
      return {
        buttonColor: getColor(theme, 500),
        textColor: '#FFF',
      };
    default:
      throw new UnreachableError(mode);
  }
};

const getDisabledStyleProps = (mode: Props['mode']): StyleProps => {
  switch (mode) {
    case 'text':
      return {
        textColor: getColor('neutral', 500),
        rippleColor: 'transparent',
      };
    case 'outlined':
      return {
        textColor: getColor('neutral', 500),
        rippleColor: 'transparent',
        style: {
          borderColor: getColor('neutral', 500),
          borderWidth: 2,
        },
      };
    case 'contained':
      return {
        buttonColor: getColor('neutral', 500),
        textColor: '#FFF',
        rippleColor: 'transparent',
      };
    default:
      throw new UnreachableError(mode);
  }
};
