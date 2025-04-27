import TextInput from '@/components/base/form/TextInput';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {Props} from './common';

export default function DateTimePicker({
  name,
  value,
  androidOptions = {},
  control,
  onConfirm,
  onDismiss,
}: Props) {
  const {
    mode = 'date',
    dateDisplay = 'default',
    timeDisplay = 'default',
  } = androidOptions;

  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  console.log({mode});
  const showDatePicker = mode === 'date' || mode === 'datetime';
  const showTimePicker = mode === 'time' || mode === 'datetime';

  const onShowDatePicker = () => {
    console.log('onShowDatePicker');
    DateTimePickerAndroid.open({
      mode: 'date',
      display: dateDisplay,
      value,
      onChange: (event, date?: Date) => {
        console.log('onShowDatePicker', {date, value});
        switch (event.type) {
          case 'set':
            if (date) {
              onConfirm(date);
            }
            return;
          case 'dismissed':
            onDismiss?.();
            return;
          case 'neutralButtonPressed':
            return;
        }
      },
    });
  };

  const onShowTimePicker = () => {
    console.log('onShowTimePicker');
    DateTimePickerAndroid.open({
      mode: 'time',
      display: timeDisplay,
      value,
      onChange: (event, date?: Date) => {
        console.log('onShowTimePicker', {date, value});
        switch (event.type) {
          case 'set':
            if (date) {
              onConfirm(date);
            }
            return;
          case 'dismissed':
            onDismiss?.();
            return;
          case 'neutralButtonPressed':
            return;
        }
      },
    });
  };

  return (
    <>
      {showDatePicker && (
        <Pressable onPress={onShowDatePicker}>
          <TextInput
            name={name}
            label="Date"
            editable={false}
            control={control}
            value={value.toLocaleDateString()}
          />
        </Pressable>
      )}

      {showTimePicker && (
        <Pressable onPress={onShowTimePicker}>
          <TextInput
            name={name}
            label="Time"
            editable={false}
            control={control}
            value={value.toLocaleTimeString()}
          />
        </Pressable>
      )}
    </>
  );
}
