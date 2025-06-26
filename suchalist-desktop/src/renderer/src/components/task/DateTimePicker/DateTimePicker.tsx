import { InternalTextInput } from '@renderer/components/base/form/TextInput';
import { HookFormFieldProps } from '@renderer/hooks/useForm';
import { formatDate } from '@renderer/utils/format';
import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';

interface Props extends HookFormFieldProps {
  name: string;
  label: string;
  value: Date | undefined;
  onChange: (date: Date) => void;
}

export default function DateTimePicker({ name, label, value, control, onChange }: Props) {
  const handleChange = (date: Date | null) => {
    if (date) {
      onChange(date);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <DatePicker
      selected={value}
      onChange={handleChange}
      customInput={
        <DateTimePickerInput
          fieldName={name}
          label={label}
          control={control}
          onClick={handleClick}
        />
      }
    />
  );
}

interface DateTimePickerInputProps extends HookFormFieldProps {
  fieldName: string;
  label: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const DateTimePickerInput = forwardRef<HTMLInputElement, DateTimePickerInputProps>(
  function InnerDateTimePickerInput({ fieldName, label, control, onClick }, ref) {
    return (
      <Controller
        name={fieldName}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InternalTextInput
            ref={ref}
            name={fieldName}
            label={label}
            value={value ? formatDate(value, 'date') : ''}
            onClick={onClick}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
    );
  }
);
