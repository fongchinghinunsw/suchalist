import Button from '@/components/base/Button';
import {getColor} from '@/constants/styles';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {Props} from './common';
import {useState} from 'react';

export default function DateTimePickerIOS({
  name,
  value,
  iosOptions = {
    mode: 'datetime',
    display: 'default',
    isVisible: false,
  },
  control,
  onConfirm,
  onDismiss,
}: Props) {
  const {mode, display, isVisible} = iosOptions;

  const theme = useSelector<RootState, Theme>(state => state.theme.theme);

  const [selectedValue, setSelectedValue] = useState(value);

  const onConfirmClick = () => {
    onConfirm(selectedValue);
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}>
        <Controller
          name={name}
          control={control}
          render={() => {
            console.log({value});
            return (
              <DateTimePicker
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
                      onDismiss();
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
