import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  TextInput as PaperTextInput,
  type TextInputProps,
} from 'react-native-paper';
import {HookFormFieldProps} from '../../../hooks/useForm';
import {JSX} from 'react';

interface Props extends TextInputProps, HookFormFieldProps {
  name: string;
  label: string;
  style?: any;
}

export default function TextInput({
  name,
  label,
  control,
  style,
  ...otherProps
}: Props): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <PaperTextInput
          mode="outlined"
          autoCapitalize="none"
          label={label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          style={{...styles.input, ...style}}
          {...otherProps}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    // preventing long text results in linebreak
    // textAlign: 'auto',
  },
});
