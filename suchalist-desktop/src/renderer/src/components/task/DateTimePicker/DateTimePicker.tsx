import { InternalTextInput } from '@renderer/components/base/form/TextInput';
import IconButton from '@renderer/components/base/IconButton';
import { HookFormFieldProps } from '@renderer/hooks/useForm';
import { formatDate } from '@renderer/utils/format';
import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import { TiDelete } from 'react-icons/ti';

interface Props extends HookFormFieldProps {
  name: string;
  label: string;
  onClearInput: () => void;
}

export default function DateTimePicker({ name, label, control, onClearInput }: Props) {
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('onClick');
    e.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        console.log({ value });
        return (
          <DatePicker
            selected={value}
            onChange={onChange}
            customInput={
              <DateTimePickerInput
                fieldName={name}
                label={label}
                fieldValue={value ? formatDate(value, 'date') : ''}
                onClick={onClick}
                onClearInput={onClearInput}
              />
            }
          />
        );
      }}
    />
  );
}

interface DateTimePickerInputProps {
  fieldName: string;
  label: string;
  fieldValue: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onClearInput: () => void;
}

const DateTimePickerInput = forwardRef<HTMLInputElement, DateTimePickerInputProps>(
  function InnerDateTimePickerInput({ fieldName, label, fieldValue, onClick, onClearInput }, ref) {
    const [isFocused, setIsFocused] = useState(false);

    const onFocus: React.FocusEventHandler<HTMLInputElement> = () => {
      setIsFocused(true);
    };

    const onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
      setIsFocused(false);
    };

    return (
      <div className="relative">
        <InternalTextInput
          ref={ref}
          name={fieldName}
          label={label}
          value={fieldValue}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {isFocused && (
          <IconButton
            Icon={TiDelete}
            size={24}
            className="z-20 absolute text-red-400 right-2 top-1/5"
            onClick={onClearInput}
          />
        )}
      </div>
    );
  }
);
