import Button from '@/components/base/Button';
import DateTimePickerIOS from '@/components/base/form/DateTimePickerIOS';
import Switch from '@/components/base/form/Switch';
import {HookFormFieldProps} from '@/hooks/useForm';
import {useState} from 'react';
import {StyleSheet} from 'react-native';

interface Props extends HookFormFieldProps {
  localizedTime: string;
  onToggleEnableReminder: (value: boolean) => void;
  onConfirmTime: () => void;
}

export default function TimeSection({
  localizedTime,
  control,
  onToggleEnableReminder,
  onConfirmTime,
}: Props) {
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onShowTimePicker = () => {
    setShowTimePicker(true);
  };

  const onDismissTimePicker = () => {
    setShowTimePicker(false);
  };

  const onConfirm = () => {
    onConfirmTime();
    onDismissTimePicker();
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

      <DateTimePickerIOS
        name="time"
        control={control}
        mode="time"
        display="spinner"
        isVisible={showTimePicker}
        onConfirm={onConfirm}
        onDismiss={onDismissTimePicker}
      />
    </>
  );
}

const styles = StyleSheet.create({
  changTimeButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
});
