import React from 'react';
import {Controller} from 'react-hook-form';
import {Dropdown, Option} from 'react-native-paper-dropdown';
import {HookFormFieldProps} from '../../../hooks/useForm';

interface Props extends HookFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  options: Option[];
  style?: any;
}

export default function DropdownInput({
  name,
  label,
  placeholder,
  control,
  options,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}}) => (
        <Dropdown
          label={label}
          placeholder={placeholder}
          value={value}
          options={options}
          onSelect={onChange}
        />
      )}
    />
  );
}
