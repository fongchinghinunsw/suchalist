import { Theme } from '@/stores/theme';
import { Shade } from '@/types/styles';
import { UnreachableError } from '../UnreachableError';

export function getTextColorClassName(theme: Theme, shade: Shade) {
  switch (theme) {
    case 'blue':
      switch (shade) {
        case 100:
          return 'text-blue-100';
        case 200:
          return 'text-blue-200';
        case 300:
          return 'text-blue-300';
        case 400:
          return 'text-blue-400';
        case 500:
          return 'text-blue-500';
        case 600:
          return 'text-blue-600';
        case 700:
          return 'text-blue-700';
        case 800:
          return 'text-blue-800';
        case 900:
          return 'text-blue-900';
        default:
          throw new UnreachableError(shade);
      }
    case 'green':
      switch (shade) {
        case 100:
          return 'text-green-100';
        case 200:
          return 'text-green-200';
        case 300:
          return 'text-green-300';
        case 400:
          return 'text-green-400';
        case 500:
          return 'text-green-500';
        case 600:
          return 'text-green-600';
        case 700:
          return 'text-green-700';
        case 800:
          return 'text-green-800';
        case 900:
          return 'text-green-900';
        default:
          throw new UnreachableError(shade);
      }
    case 'red':
      switch (shade) {
        case 100:
          return 'text-red-100';
        case 200:
          return 'text-red-200';
        case 300:
          return 'text-red-300';
        case 400:
          return 'text-red-400';
        case 500:
          return 'text-red-500';
        case 600:
          return 'text-red-600';
        case 700:
          return 'text-red-700';
        case 800:
          return 'text-red-800';
        case 900:
          return 'text-red-900';
        default:
          throw new UnreachableError(shade);
      }
    case 'yellow':
      switch (shade) {
        case 100:
          return 'text-yellow-100';
        case 200:
          return 'text-yellow-200';
        case 300:
          return 'text-yellow-300';
        case 400:
          return 'text-yellow-400';
        case 500:
          return 'text-yellow-500';
        case 600:
          return 'text-yellow-600';
        case 700:
          return 'text-yellow-700';
        case 800:
          return 'text-yellow-800';
        case 900:
          return 'text-yellow-900';
        default:
          throw new UnreachableError(shade);
      }
    case 'purple':
      switch (shade) {
        case 100:
          return 'text-purple-100';
        case 200:
          return 'text-purple-200';
        case 300:
          return 'text-purple-300';
        case 400:
          return 'text-purple-400';
        case 500:
          return 'text-purple-500';
        case 600:
          return 'text-purple-600';
        case 700:
          return 'text-purple-700';
        case 800:
          return 'text-purple-800';
        case 900:
          return 'text-purple-900';
        default:
          throw new UnreachableError(shade);
      }
      return;
    default:
      throw new UnreachableError(theme);
  }
}
