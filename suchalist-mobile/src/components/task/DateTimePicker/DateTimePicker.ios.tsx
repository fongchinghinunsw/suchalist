import Button from '@/components/base/Button';
import {getColor} from '@/constants/styles';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {Props} from './common';
import {useState} from 'react';
import TextInput from '@/components/base/form/TextInput';
import {formatDate} from '@/utils/format';

export default function DateTimePicker({
  name,
  value,
  iosOptions = {},
  control,
  onConfirm,
  onDismiss,
}: Props) {
  const {mode = 'datetime', display = 'default'} = iosOptions;

  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const onShowPicker = () => setIsVisible(true);

  const onDismissPicker = () => setIsVisible(false);

  const onConfirmClick = () => {
    onConfirm(selectedValue);
    onDismissPicker();
    onDismiss?.();
  };

  const onModalDismiss = () => {
    onDismissPicker();
    onDismiss?.();
  };

  console.log({mode});
  const dateTimeLabel =
    mode === 'datetime' ? 'Date / Time' : mode === 'date' ? 'Date' : 'Time';
  const dateTimeDisplay = formatDate(value, mode);

  return (
    <>
      <TextInput
        name="datetime"
        label={dateTimeLabel}
        editable={false}
        control={control}
        value={dateTimeDisplay}
        onPress={onShowPicker}
      />
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={onModalDismiss}
          contentContainerStyle={styles.container}>
          <Controller
            name={name}
            control={control}
            render={() => {
              console.log({value});
              return (
                <RNDateTimePicker
                  mode={mode}
                  display={display}
                  value={value}
                  onChange={(event, date?: Date) => {
                    switch (event.type) {
                      case 'set':
                        if (date) {
                          setSelectedValue(date);
                        }
                        return;
                      case 'dismissed':
                        return;
                      case 'neutralButtonPressed':
                        return;
                    }
                  }}
                  accentColor={getColor(theme, 500)}
                />
              );
            }}
          />

          <Button
            mode="outlined"
            style={styles.confirmButton}
            onPress={onConfirmClick}>
            Confirm
          </Button>
        </Modal>
      </Portal>
    </>
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
  confirmButton: {
    marginTop: 20,
  },
});
