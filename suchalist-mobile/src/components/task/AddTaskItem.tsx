import {Theme} from '@/stores/theme';
import {
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/stores';
import {getColor} from '@/constants/styles';
import Icon from '@react-native-vector-icons/ionicons';
import {useState} from 'react';
import SoundPlayer from 'react-native-sound-player';

type Props = {
  onAddTask: (task: {title: string}) => void;
};

export default function AddTaskItem({onAddTask}: Props) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyles(theme);

  const [title, setTitle] = useState('');

  const onTitleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const text = e.nativeEvent.text;
    setTitle(text);
  };

  const onPress = () => {
    if (title.length > 0) {
      try {
        SoundPlayer.loadSoundFile('pop', 'mp3');
        SoundPlayer.seek(0);
        SoundPlayer.play();
      } catch (e) {
        console.log('cannot play the sound file', e);
      }
      onAddTask({title: title.trim()});
      setTitle('');
      console.log({title});
    }
  };
  console.log('outside', {title});

  return (
    <View style={styles.container}>
      <Icon name="add-outline" size={24} color="#fff" onPress={onPress} />
      <TextInput value={title} onChange={onTitleChange} style={styles.input} />
    </View>
  );
}

const getStyles = (theme: Theme) => {
  const paddingVertical = Platform.select({
    ios: 14,
    android: 6,
  });

  const paddingHorizontal = Platform.select({
    ios: 12,
    android: 12,
  });

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical,
      paddingHorizontal,
      backgroundColor: getColor(theme, 400),
      borderRadius: 10,
    },
    input: {
      flex: 1,
      color: '#FFF',
      fontSize: 16,
    },
  });
};
