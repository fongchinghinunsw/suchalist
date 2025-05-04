import SoundPlayer from 'react-native-sound-player';
import Icon from '@react-native-vector-icons/entypo';
import {Pressable, StyleSheet, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {getColor} from '@/constants/styles';
import {Task} from '@/stores/tasks';
import {useSelector} from 'react-redux';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';
import Text from '../base/Text';

SoundPlayer.loadSoundFile('ding', 'mp3');

type Props = {
  task: Task;
  setIsCompleted: (id: string, isCompleted: boolean) => void;
  onPress: (task: Task) => void;
};

export default function TaskItem({task, setIsCompleted, onPress}: Props) {
  const {id, title, isCompleted, recurrence} = task;

  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyle(theme);

  const handlePress = (isChecked: boolean) => {
    setIsCompleted(id, isChecked);

    if (!isChecked) {
      return;
    }

    try {
      SoundPlayer.seek(0);
      SoundPlayer.play();
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => onPress(task)}>
      <Text
        shade={700}
        numberOfLines={1}
        style={[styles.title, isCompleted && styles.titleCompleted]}>
        {title}
      </Text>
      {recurrence && (
        <Icon name="cycle" size={18} color={getColor(theme, 600)} />
      )}
      <View style={styles.checkbox}>
        <BouncyCheckbox
          isChecked={isCompleted}
          iconStyle={styles.checkboxIcon}
          innerIconStyle={styles.checkboxInnerIcon}
          fillColor={getColor(theme, 400)}
          onPress={(isChecked: boolean) => handlePress(isChecked)}
        />
      </View>
    </Pressable>
  );
}

const getStyle = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      backgroundColor: '#FFF',
      borderColor: getColor(theme, 400),
      borderWidth: 2,
      borderRadius: 10,
    },
    title: {
      flex: 1,
      overflow: 'hidden',
    },
    titleCompleted: {
      textDecorationLine: 'line-through',
    },
    checkbox: {
      alignSelf: 'flex-end',
      marginLeft: 12,
    },
    checkboxIcon: {
      borderRadius: 8,
    },
    checkboxInnerIcon: {
      borderRadius: 8,
    },
  });
};
