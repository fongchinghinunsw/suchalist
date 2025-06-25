import { HookFormFieldProps } from '@renderer/hooks/useForm';
import { selectTheme, Theme } from '@renderer/stores/theme';
import { UnreachableError } from '@renderer/utils/UnreachableError';
import clsx from 'clsx';
import { ComponentProps } from 'react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';

type InputProps = ComponentProps<'input'>;

interface InternalProps {
  ref?: ComponentProps<'div'>['ref'];
  name: string;
  label: string;
  value: string;
  disabled?: InputProps['disabled'];
  onClick?: InputProps['onClick'];
  onChange?: InputProps['onChange'];
  onBlur?: InputProps['onBlur'];
}

interface Props extends HookFormFieldProps, Omit<InternalProps, 'value'> {}

export default function TextInput({
  ref,
  name,
  label,
  disabled,
  control,
  onClick,
  ...otherProps
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <InternalTextInput
          ref={ref}
          name={name}
          label={label}
          value={value}
          disabled={disabled}
          onClick={onClick}
          onChange={onChange}
          onBlur={onBlur}
          {...otherProps}
        />
      )}
    />
  );
}

function InternalTextInput({
  ref,
  name,
  label,
  value,
  disabled,
  onClick,
  onChange,
  onBlur
}: InternalProps) {
  const theme = useSelector(selectTheme);

  return (
    <div
      ref={ref}
      className="relative group flex h-10 flex-col justify-center items-start"
      onClick={onClick}
    >
      <input
        type="text"
        name={name}
        // this ensures the input value UI gets updated when the new value is undefined
        // https://stackoverflow.com/questions/68488356/input-value-is-not-getting-updated-when-state-object-is-set-to-undefined
        value={value ?? ''}
        disabled={disabled}
        className={clsx(
          'z-10 peer absolute w-full outline-none leading-8 border rounded-md px-3 py-1 transition ease-in duration-100 bg-transparent',
          getInputStyles(theme)
        )}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      <label
        className={clsx(
          'relative text-md mx-3 transition ease-in duration-200 peer-focus:z-10 peer-valid:z-10 peer-focus:px-1 peer-valid:px-1 peer-focus:bg-white peer-valid:bg-white peer-focus:leading-2 peer-valid:leading-2 peer-focus:-translate-x-2.5 peer-valid:-translate-x-2.5 peer-focus:-translate-y-5 peer-valid:-translate-y-5 peer-focus:scale-80 peer-valid:scale-80',
          getLabelStyles(theme)
        )}
      >
        {label}
      </label>
    </div>
  );
}

function getInputStyles(theme: Theme) {
  switch (theme) {
    case 'blue':
      return 'caret-blue-500 focus:border-blue-400 valid:border-blue-400';
    case 'green':
      return 'caret-green-500 focus:border-green-400 valid:border-green-400';
    case 'red':
      return 'caret-red-500 focus:border-red-400 valid:border-red-400';
    case 'yellow':
      return 'caret-yellow-500 focus:border-yellow-400 valid:border-yellow-400';
    case 'purple':
      return 'caret-purple-500 focus:border-purple-400 valid:border-purple-400';
    default:
      throw new UnreachableError(theme);
  }
}

function getLabelStyles(theme: Theme) {
  switch (theme) {
    case 'blue':
      return 'peer-focus:text-blue-400 peer-valid:text-blue-400';
    case 'green':
      return 'peer-focus:text-green-400 peer-valid:text-green-400';
    case 'red':
      return 'peer-focus:text-red-400 peer-valid:text-red-400';
    case 'yellow':
      return 'peer-focus:text-yellow-400 peer-valid:text-yellow-400';
    case 'purple':
      return 'peer-focus:text-purple-400 peer-valid:text-purple-400';
    default:
      throw new UnreachableError(theme);
  }
}
