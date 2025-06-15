import TextInput from '@renderer/components/base/TextInput';
import { HookFormFieldProps } from '@renderer/hooks/useForm';
import { formatDate } from '@renderer/utils/format';
import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';

interface Props extends HookFormFieldProps {
  name: string;
  value: Date | undefined;
  onChange: (date: Date) => void;
}

export default function DateTimePicker({ name, value, control, onChange }: Props) {
  console.log('DateTimePicker', name);
  const handleChange = (date: Date | null) => {
    if (date) {
      onChange(date);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <DatePicker
      selected={value}
      onChange={handleChange}
      customInput={
        <DateTimePickerInput
          name={name}
          control={control}
          value={value ? formatDate(value, 'date') : ''}
          onClick={handleClick}
        />
      }
    />
  );
}

interface DateTimePickerInputProps extends HookFormFieldProps {
  name: string;
  value: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

// Using forwardRef because we want custom input for DatePicker
const DateTimePickerInput = forwardRef<HTMLDivElement, DateTimePickerInputProps>(
  function DateTimePickerInput({ name, control, onClick }, ref) {
    console.log('DateTimePickerInput', name);
    return (
      <TextInput ref={ref} name={name} label="Date / Time" control={control} onClick={onClick} />
    );
  }
);
