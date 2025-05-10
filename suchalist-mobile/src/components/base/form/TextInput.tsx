import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  TextInput as PaperTextInput,
  type TextInputProps,
} from 'react-native-paper';
import {HookFormFieldProps} from '@/hooks/useForm';
import {JSX} from 'react';
import {getColor} from '@/constants/styles';
import {useSelector} from 'react-redux';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';

interface Props extends TextInputProps, Partial<HookFormFieldProps> {
  name: string;
  label: string;
  style?: any;
}

export default function TextInput({
  name,
  label,
  control,
  style,
  value,
  onChangeText,
  onBlur,
  ...otherProps
}: Props): JSX.Element {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

  const commonProps = {
    mode: 'outlined' as const,
    autoCapitalize: 'none' as const,
    label,
    cursorColor: getColor(theme, 400),
    activeOutlineColor: getColor(theme, 400),
    selectionColor: getColor(theme, 400),
    style: [{...styles.input}, style],
    ...otherProps,
  };

  if (control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({
          field: {onChange, onBlur: controllerOnBlur, value: controllerValue},
        }) => (
          <PaperTextInput
            value={controllerValue}
            onChangeText={onChange}
            onBlur={controllerOnBlur}
            {...commonProps}
          />
        )}
      />
    );
  }

  return (
    <PaperTextInput
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      {...commonProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    // preventing long text results in linebreak
    // textAlign: 'auto',
  },
});
