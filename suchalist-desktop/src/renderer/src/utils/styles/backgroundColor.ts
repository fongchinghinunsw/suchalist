import { Theme } from '@/stores/theme';
import { Shade } from '@/types/styles';
import { UnreachableError } from '../UnreachableError';

export function getBackgroundColorClassName(theme: Theme, shade: Shade) {
  switch (theme) {
    case 'blue':
      switch (shade) {
        case 100:
          return 'bg-blue-100';
        case 200:
          return 'bg-blue-200';
        case 300:
          return 'bg-blue-300';
        case 400:
          return 'bg-blue-400';
        case 500:
          return 'bg-blue-500';
        case 600:
          return 'bg-blue-600';
        case 700:
          return 'bg-blue-700';
        case 800:
          return 'bg-blue-800';
        case 900:
          return 'bg-blue-900';
        default:
          throw new UnreachableError(shade);
      }
    case 'green':
      switch (shade) {
        case 100:
          return 'bg-green-100';
        case 200:
          return 'bg-green-200';
        case 300:
          return 'bg-green-300';
        case 400:
          return 'bg-green-400';
        case 500:
          return 'bg-green-500';
        case 600:
          return 'bg-green-600';
        case 700:
          return 'bg-green-700';
        case 800:
          return 'bg-green-800';
        case 900:
          return 'bg-green-900';
        default:
          throw new UnreachableError(shade);
      }
    case 'red':
      switch (shade) {
        case 100:
          return 'bg-red-100';
        case 200:
          return 'bg-red-200';
        case 300:
          return 'bg-red-300';
        case 400:
          return 'bg-red-400';
        case 500:
          return 'bg-red-500';
        case 600:
          return 'bg-red-600';
        case 700:
          return 'bg-red-700';
        case 800:
          return 'bg-red-800';
        case 900:
          return 'bg-red-900';
        default:
          throw new UnreachableError(shade);
      }
    case 'yellow':
      switch (shade) {
        case 100:
          return 'bg-yellow-100';
        case 200:
          return 'bg-yellow-200';
        case 300:
          return 'bg-yellow-300';
        case 400:
          return 'bg-yellow-400';
        case 500:
          return 'bg-yellow-500';
        case 600:
          return 'bg-yellow-600';
        case 700:
          return 'bg-yellow-700';
        case 800:
          return 'bg-yellow-800';
        case 900:
          return 'bg-yellow-900';
        default:
          throw new UnreachableError(shade);
      }
    case 'purple':
      switch (shade) {
        case 100:
          return 'bg-purple-100';
        case 200:
          return 'bg-purple-200';
        case 300:
          return 'bg-purple-300';
        case 400:
          return 'bg-purple-400';
        case 500:
          return 'bg-purple-500';
        case 600:
          return 'bg-purple-600';
        case 700:
          return 'bg-purple-700';
        case 800:
          return 'bg-purple-800';
        case 900:
          return 'bg-purple-900';
        default:
          throw new UnreachableError(shade);
      }
      return;
    default:
      throw new UnreachableError(theme);
  }
}
