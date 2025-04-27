import {UnreachableError} from '@/components/base/UnreachableError';

type DateFormat = 'datetime' | 'date' | 'time';

export const formatDate = (date: Date, format: DateFormat) => {
  switch (format) {
    case 'datetime':
      return date.toLocaleString();
    case 'date':
      return date.toLocaleDateString();
    case 'time':
      return date.toLocaleTimeString();
    default:
      throw new UnreachableError(format);
  }
};
