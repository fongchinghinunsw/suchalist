import {HookFormFieldProps} from '@/hooks/useForm';

export interface Props extends HookFormFieldProps {
  name: string;
  value: Date;
  androidOptions?: {
    mode?: 'date' | 'time';
    dateDisplay?: 'default' | 'spinner' | 'calendar';
    timeDisplay?: 'default' | 'spinner' | 'clock';
  };
  iosOptions?: {
    mode?: 'datetime' | 'date' | 'time';
    display?: 'default' | 'spinner' | 'compact' | 'inline';
    isVisible: boolean;
  };
  isVisible: boolean; // TODO remove this maybe
  onConfirm: (date: Date) => void;
  onDismiss: () => void;
}
