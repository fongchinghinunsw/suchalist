import RNSoundPlayer from 'react-native-sound-player';

type Sound = 'ding' | 'bubble_pop' | 'pop';

type Config = {
  filename: string;
  extension: string;
  volume: number;
};

const SOUND_CONFIG: Record<Sound, Config> = {
  ding: {
    filename: 'ding',
    extension: 'mp3',
    volume: 0.6,
  },
  bubble_pop: {
    filename: 'bubble_pop',
    extension: 'mp3',
    volume: 0.3,
  },
  pop: {
    filename: 'pop',
    extension: 'mp3',
    volume: 1,
  },
};

export default class SoundPlayer {
  static play(sound: Sound, override?: Pick<Partial<Config>, 'volume'>) {
    try {
      const config: Config = {
        ...SOUND_CONFIG[sound],
        ...override,
      };

      const {filename, extension, volume} = config;
      RNSoundPlayer.loadSoundFile(filename, extension);
      RNSoundPlayer.setVolume(volume);
      RNSoundPlayer.seek(0);
      RNSoundPlayer.play();
    } catch (e) {
      console.warn(`[SoundPlayer] Failed to play sound "${sound}":`, e);
    }
  }
}
