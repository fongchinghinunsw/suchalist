import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {
  TextInput as PaperTextInput,
  type TextInputProps,
} from 'react-native-paper';
import {HookFormFieldProps} from '../../../hooks/useForm';
import {JSX} from 'react';
import {getColor} from '../../../constants/styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../stores';
import {Theme} from '../../../stores/theme';

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
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

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
          cursorColor={getColor(theme, 400)}
          activeOutlineColor={getColor(theme, 400)}
          selectionColor={getColor(theme, 400)}
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
