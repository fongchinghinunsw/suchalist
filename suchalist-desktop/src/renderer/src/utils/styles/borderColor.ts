import { Theme } from '@/stores/theme';
import { Shade } from '@/types/styles';
import { UnreachableError } from '../UnreachableError';

export function getBorderColorClassName(theme: Theme, shade: Shade) {
  switch (theme) {
    case 'blue':
      switch (shade) {
        case 100:
          return 'border-blue-100';
        case 200:
          return 'border-blue-200';
        case 300:
          return 'border-blue-300';
        case 400:
          return 'border-blue-400';
        case 500:
          return 'border-blue-500';
        case 600:
          return 'border-blue-600';
        case 700:
          return 'border-blue-700';
        case 800:
          return 'border-blue-800';
        case 900:
          return 'border-blue-900';
        default:
          throw new UnreachableError(shade);
      }
    case 'green':
      switch (shade) {
        case 100:
          return 'border-green-100';
        case 200:
          return 'border-green-200';
        case 300:
          return 'border-green-300';
        case 400:
          return 'border-green-400';
        case 500:
          return 'border-green-500';
        case 600:
          return 'border-green-600';
        case 700:
          return 'border-green-700';
        case 800:
          return 'border-green-800';
        case 900:
          return 'border-green-900';
        default:
          throw new UnreachableError(shade);
      }
    case 'red':
      switch (shade) {
        case 100:
          return 'border-red-100';
        case 200:
          return 'border-red-200';
        case 300:
          return 'border-red-300';
        case 400:
          return 'border-red-400';
        case 500:
          return 'border-red-500';
        case 600:
          return 'border-red-600';
        case 700:
          return 'border-red-700';
        case 800:
          return 'border-red-800';
        case 900:
          return 'border-red-900';
        default:
          throw new UnreachableError(shade);
      }
    case 'yellow':
      switch (shade) {
        case 100:
          return 'border-yellow-100';
        case 200:
          return 'border-yellow-200';
        case 300:
          return 'border-yellow-300';
        case 400:
          return 'border-yellow-400';
        case 500:
          return 'border-yellow-500';
        case 600:
          return 'border-yellow-600';
        case 700:
          return 'border-yellow-700';
        case 800:
          return 'border-yellow-800';
        case 900:
          return 'border-yellow-900';
        default:
          throw new UnreachableError(shade);
      }
    case 'purple':
      switch (shade) {
        case 100:
          return 'border-purple-100';
        case 200:
          return 'border-purple-200';
        case 300:
          return 'border-purple-300';
        case 400:
          return 'border-purple-400';
        case 500:
          return 'border-purple-500';
        case 600:
          return 'border-purple-600';
        case 700:
          return 'border-purple-700';
        case 800:
          return 'border-purple-800';
        case 900:
          return 'border-purple-900';
        default:
          throw new UnreachableError(shade);
      }
      return;
    default:
      throw new UnreachableError(theme);
  }
}
