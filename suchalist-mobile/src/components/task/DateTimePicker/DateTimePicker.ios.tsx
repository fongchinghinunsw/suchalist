import Button from '@/components/base/Button';
import TextInput from '@/components/base/form/TextInput';
import {getColor} from '@/constants/styles';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';
import {formatDate} from '@/utils/format';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {Props} from './common';

export default function DateTimePicker({
  name,
  value,
  isTextInputVisible = true,
  iosOptions = {},
  control,
  onConfirm,
  onDismiss,
}: Props) {
  const {mode = 'datetime', display = 'default'} = iosOptions;

  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyles(theme);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value ?? new Date());

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

  const dateTimeLabel =
    mode === 'datetime' ? 'Date / Time' : mode === 'date' ? 'Date' : 'Time';
  const dateTimeDisplay = value !== undefined ? formatDate(value, mode) : '';

  return (
    <>
      {isTextInputVisible && (
        <TextInput
          name={name}
          label={dateTimeLabel}
          editable={false}
          control={control}
          value={dateTimeDisplay}
          onPress={onShowPicker}
        />
      )}
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
                  value={selectedValue}
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
                  accentColor={getColor(theme, 600)}
                />
              );
            }}
          />

          <Button
            mode="outlined"
            style={styles.confirmButton}
            textStyle={styles.confirmButtonText}
            onPress={onConfirmClick}>
            Confirm
          </Button>
        </Modal>
      </Portal>
    </>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: getColor(theme, 400),
      marginHorizontal: 20,
      padding: 20,
      borderRadius: 16,
      alignItems: 'center',
    },
    confirmButton: {
      marginTop: 20,
      borderColor: '#000',
    },
    confirmButtonText: {
      color: '#000',
    },
  });
};
