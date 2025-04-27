import * as React from 'react';
import {Switch as PaperSwitch} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';
import {getColor} from '@/constants/styles';
import {HookFormFieldProps} from '@/hooks/useForm';
import {Controller} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import Text from '../Text';

interface Props
  extends React.ComponentProps<typeof PaperSwitch>,
    HookFormFieldProps {
  name: string;
  label: string;
  onClick?: (isEnabled: boolean) => void;
}

export default function Switch({
  name,
  label,
  control,
  onClick,
  ...otherProps
}: Props) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

  return (
    <View style={styles.container}>
      <Text tone="neutral" style={styles.label}>
        {label}
      </Text>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, value}}) => (
          <PaperSwitch
            value={value}
            onValueChange={isEnabled => {
              onChange(isEnabled);
              onClick?.(isEnabled);
            }}
            color={getColor(theme, 500)}
            {...otherProps}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: '500',
  },
});
