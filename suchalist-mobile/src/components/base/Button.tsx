import {getColor} from '@/constants/styles';
import {selectTheme, Theme} from '@/stores/theme';
import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {useSelector} from 'react-redux';
import {UnreachableError} from './UnreachableError';

type ButtonTone = 'neutral' | 'danger';
type ButtonMode = 'text' | 'outlined' | 'contained';

type Props = {
  children: string;
  mode: ButtonMode;
  tone?: ButtonTone;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
};

export default function Button({
  children,
  mode,
  tone,
  style,
  textStyle,
  ...otherProps
}: Props) {
  const theme = useSelector(selectTheme);

  const styleProps = otherProps.disabled
    ? getDisabledStyleProps(mode)
    : getStyleProps(theme, mode, tone);

  return (
    <Pressable
      style={({pressed}) => [
        styles.base,
        styleProps.container,
        pressed && !otherProps.disabled && styles.pressed,
        style,
      ]}
      {...otherProps}>
      <Text style={[styles.text, styleProps.text, textStyle]}>{children}</Text>
    </Pressable>
  );
}

type StyleProps = {
  container: ViewStyle;
  text: TextStyle;
};

const getStyleProps = (
  defaultTheme: Theme,
  mode: ButtonMode,
  tone?: ButtonTone,
): StyleProps => {
  const theme = tone === undefined ? defaultTheme : getButtonTheme(tone);
  const color = getColor(theme, 500);

  switch (mode) {
    case 'text':
      return {
        container: {},
        text: {color},
      };
    case 'outlined':
      return {
        container: {
          borderColor: color,
          borderWidth: 2,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
        },
        text: {color},
      };
    case 'contained':
      return {
        container: {
          backgroundColor: color,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
        },
        text: {color: '#FFF'},
      };
    default:
      throw new UnreachableError(mode);
  }
};

const getButtonTheme = (tone: ButtonTone): Theme => {
  switch (tone) {
    case 'neutral':
      return 'neutral';
    case 'danger':
      return 'red';
    default:
      throw new UnreachableError(tone);
  }
};

const getDisabledStyleProps = (mode: Props['mode']): StyleProps => {
  const neutral = getColor('neutral', 500);

  switch (mode) {
    case 'text':
      return {
        container: {},
        text: {color: neutral},
      };
    case 'outlined':
      return {
        container: {
          borderColor: neutral,
          borderWidth: 2,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
        },
        text: {color: neutral},
      };
    case 'contained':
      return {
        container: {
          backgroundColor: neutral,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 6,
        },
        text: {color: '#FFF'},
      };
    default:
      throw new UnreachableError(mode);
  }
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  text: {
    fontWeight: '600',
    fontSize: 16,
  },
});
