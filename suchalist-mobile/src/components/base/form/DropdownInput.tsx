import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import PaperDropdown, {
  DropDownPropsInterface,
} from 'react-native-paper-dropdown';
import {HookFormFieldProps} from '../../../hooks/useForm';
import {useSelector} from 'react-redux';
import {Theme} from '../../../stores/theme';
import {RootState} from '../../../stores';
import {StyleSheet} from 'react-native';
import {getColor} from '../../../constants/styles';

interface Props extends HookFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  options: DropDownPropsInterface['list'];
  style?: any;
}

export default function DropdownInput({
  name,
  label,
  placeholder,
  control,
  options,
}: Props) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyles(theme);

  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}}) => (
        <PaperDropdown
          label={label}
          mode="outlined"
          placeholder={placeholder}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={value}
          setValue={onChange}
          list={options}
          dropDownItemSelectedStyle={styles.itemSelected}
          dropDownItemSelectedTextStyle={styles.textSelected}
        />
      )}
    />
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    itemSelected: {
      backgroundColor: getColor(theme, 400),
    },
    textSelected: {
      color: getColor(theme, 800),
    },
  });
};
