import {UnreachableError} from '@/components/base/UnreachableError';

type DateFormat = 'datetime' | 'date' | 'time';

export const formatDate = (date: Date, format: DateFormat) => {
  switch (format) {
    case 'datetime':
      return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    case 'date':
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    case 'time':
      return date.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    default:
      throw new UnreachableError(format);
  }
};
