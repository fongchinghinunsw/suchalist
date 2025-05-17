import TextInput from '@/components/base/form/TextInput';
import {getColor} from '@/constants/styles';
import {selectTheme} from '@/stores/theme';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {Props} from './common';

export default function DateTimePicker({
  name,
  value,
  isTextInputVisible = true,
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

  const theme = useSelector(selectTheme);

  const selectedValue = value ?? new Date();

  const showDatePicker =
    (mode === 'date' || mode === 'datetime') && isTextInputVisible;
  const showTimePicker =
    (mode === 'time' || mode === 'datetime') && isTextInputVisible;

  const dateTimeDisplay =
    value !== undefined
      ? showDatePicker
        ? value.toLocaleDateString()
        : value.toLocaleTimeString()
      : '';

  const onShowDatePicker = () => {
    DateTimePickerAndroid.open({
      mode: 'date',
      display: dateDisplay,
      value: selectedValue,
      style: {
        backgroundColor: getColor(theme, 600),
      },
      onChange: (event, date?: Date) => {
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
    DateTimePickerAndroid.open({
      mode: 'time',
      display: timeDisplay,
      value: selectedValue,
      onChange: (event, date?: Date) => {
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
            value={dateTimeDisplay}
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
            value={dateTimeDisplay}
          />
        </Pressable>
      )}
    </>
  );
}
