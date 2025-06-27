import { InternalTextInput } from '@renderer/components/base/form/TextInput';
import { HookFormFieldProps } from '@renderer/hooks/useForm';
import { formatDate } from '@renderer/utils/format';
import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';

interface Props extends HookFormFieldProps {
  name: string;
  label: string;
  // value: Date | undefined;
  // onChange: (date: Date) => void;
}

export default function DateTimePicker({ name, label, control }: Props) {
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
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
}

const DateTimePickerInput = forwardRef<HTMLInputElement, DateTimePickerInputProps>(
  function InnerDateTimePickerInput({ fieldName, label, fieldValue, onClick }, ref) {
    return (
      <InternalTextInput
        ref={ref}
        name={fieldName}
        label={label}
        value={fieldValue}
        onClick={onClick}
      />
    );
  }
);
