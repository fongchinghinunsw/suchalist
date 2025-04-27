import Button from '@/components/base/Button';
import Switch from '@/components/base/form/Switch';
import {HookFormFieldProps} from '@/hooks/useForm';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {StyleSheet} from 'react-native';

interface Props extends HookFormFieldProps {
  time: Date;
  localizedTime: string;
  onToggleEnableReminder: (value: boolean) => void;
  onTimeChange: (date: Date) => void;
}

export default function TimeSection({
  time,
  localizedTime,
  control,
  onToggleEnableReminder,
  onTimeChange,
}: Props) {
  const onShowTimePicker = () => {
    DateTimePickerAndroid.open({
      mode: 'time',
      value: time,
      onChange: (_, date?: Date) => {
        if (date) {
          onTimeChange(date);
        }
      },
    });
  };

  return (
    <>
      <Switch
        name="toggleDailyReminder"
        label={localizedTime}
        control={control}
        onClick={onToggleEnableReminder}
      />

      <Button
        mode="contained"
        style={styles.changTimeButton}
        onPress={onShowTimePicker}>
        Change Time
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  changTimeButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
});
