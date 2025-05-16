import {getColor} from '@/constants/styles';
import {HookFormFieldProps} from '@/hooks/useForm';
import {selectTheme, Theme} from '@/stores/theme';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import PaperDropdown, {
  DropDownPropsInterface,
} from 'react-native-paper-dropdown';
import {useSelector} from 'react-redux';

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
  const theme = useSelector(selectTheme);
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
