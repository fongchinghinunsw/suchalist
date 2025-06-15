import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm as useHookForm,
  type Control,
  type FieldValues,
  type UseFormProps
} from 'react-hook-form';
import * as z from 'zod';

export interface HookFormFieldProps {
  control: Control<any, any>;
}

interface UseHookFormProps<TFieldValues extends FieldValues> extends UseFormProps<TFieldValues> {
  schema?: z.ZodSchema;
}

export default function useForm<FormFields extends FieldValues>(
  props: UseHookFormProps<FormFields> = {}
) {
  const { schema, resolver, ...otherProps } = props;
  const form = useHookForm<FormFields>({
    resolver: resolver ? zodResolver(schema) : resolver,
    ...otherProps
  });

  return { ...form };
}
