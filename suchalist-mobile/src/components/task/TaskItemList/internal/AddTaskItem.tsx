import SoundPlayer from '@/components/SoundPlayer';
import {getColor} from '@/constants/styles';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';
import Icon from '@react-native-vector-icons/ionicons';
import {useState} from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

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
      SoundPlayer.play('pop');
      onAddTask({title: title.trim()});
      setTitle('');
      console.log({title});
    }
  };
  console.log('outside', {title});

  return (
    <View style={styles.container}>
      <Icon name="add-outline" size={24} color="#fff" onPress={onPress} />
      <TextInput
        value={title}
        onChange={onTitleChange}
        placeholder="Add a task..."
        placeholderTextColor="#FFF"
        style={styles.input}
      />
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
