import DateTimePicker from '@react-native-community/datetimepicker';
import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {getColor} from '@/constants/styles';
import {HookFormFieldProps} from '@/hooks/useForm';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';
import Button from '../Button';

interface Props extends HookFormFieldProps {
  name: string;
  mode: 'datetime' | 'date' | 'time';
  isVisible: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}

export default function DateTimePickerIOS({
  name,
  mode,
  isVisible,
  control,
  onConfirm,
  onDismiss,
}: Props) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}>
        <Controller
          name={name}
          control={control}
          render={({field: {onChange, value}}) => {
            console.log({value});
            return (
              <DateTimePicker
                value={value}
                mode={mode}
                display="inline"
                onChange={(_, date) => {
                  if (date) {
                    onChange(date);
                  }
                }}
                accentColor={getColor(theme, 500)}
              />
            );
          }}
        />

        <Button
          mode="outlined"
          style={styles.confirmDateTimeButton}
          onPress={onConfirm}>
          Confirm
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  confirmDateTimeButton: {
    marginTop: 20,
  },
});
