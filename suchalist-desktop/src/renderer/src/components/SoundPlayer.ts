import { default as bubblePop } from '@/assets/sounds/bubble_pop.mp3';
import { default as ding } from '@/assets/sounds/ding.mp3';
import { default as pop } from '@/assets/sounds/pop.mp3';
import { Howl } from 'howler';

type Sound = 'ding' | 'bubble_pop' | 'pop';

type Config = {
  path: string;
  volume: number;
};

const SOUND_CONFIG: Record<Sound, Config> = {
  ding: {
    path: ding,
    volume: 0.6
  },
  bubble_pop: {
    path: bubblePop,
    volume: 0.3
  },
  pop: {
    path: pop,
    volume: 1
  }
};

export default class SoundPlayer {
  static play(sound: Sound, override?: Pick<Partial<Config>, 'volume'>) {
    try {
      const config: Config = {
        ...SOUND_CONFIG[sound],
        ...override
      };

      const { path, volume } = config;

      const soundInstance = new Howl({
        src: [path],
        volume,
        html5: true
      });

      soundInstance.seek(0);
      soundInstance.play();
    } catch (e) {
      console.warn(`[SoundPlayer] Failed to play sound "${sound}":`, e);
    }
  }
}
