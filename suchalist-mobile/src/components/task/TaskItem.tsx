import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {getColor} from '@/constants/styles';
import {RootState} from '@/stores';
import {Task} from '@/stores/tasks/types';
import {Theme} from '@/stores/theme';
import {Pressable, StyleSheet, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import SoundPlayer from 'react-native-sound-player';
import {useSelector} from 'react-redux';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Text from '../base/Text';
import Icon from '@react-native-vector-icons/ionicons';

type Props = {
  task: Task;
  setIsCompleted: (id: string, isCompleted: boolean) => void;
  onPress: (task: Task) => void;
  onRemoveTask: (id: string) => void;
};

export default function TaskItem({
  task,
  setIsCompleted,
  onPress,
  onRemoveTask,
}: Props) {
  const {id, title, isCompleted} = task;

  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyle(theme);

  const handlePress = (isChecked: boolean) => {
    setIsCompleted(id, isChecked);

    if (!isChecked) {
      try {
        SoundPlayer.loadSoundFile('pop', 'mp3');
        SoundPlayer.seek(0);
        SoundPlayer.play();
      } catch (e) {
        console.log('cannot play the sound file', e);
      }
      return;
    }

    try {
      SoundPlayer.loadSoundFile('ding', 'mp3');
      SoundPlayer.seek(0);
      SoundPlayer.play();
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  };

  return (
    <Swipeable
      containerStyle={styles.swipeable}
      renderRightActions={(progress, drag) =>
        RightAction({progress, drag, onRemoveTask: () => onRemoveTask(task.id)})
      }
      overshootRight={false}>
      <Pressable style={styles.pressable} onPress={() => onPress(task)}>
        <Text
          shade={700}
          numberOfLines={1}
          style={[styles.title, isCompleted && styles.titleCompleted]}>
          {title}
        </Text>
        {/* {recurrence && (
        <Icon name="cycle" size={18} color={getColor(theme, 600)} />
      )} */}
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
    </Swipeable>
  );
}

type RightActionProps = {
  progress: SharedValue<number>;
  drag: SharedValue<number>;
  onRemoveTask: () => void;
};

function RightAction({drag, onRemoveTask}: RightActionProps) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyle(theme);

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drag.value + styles.rightAction.width}],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Pressable style={styles.rightAction} onPress={onRemoveTask}>
        <Icon name="trash-outline" color="#FFF" size={24} />
      </Pressable>
    </Reanimated.View>
  );
}

const getStyle = (theme: Theme) => {
  return StyleSheet.create({
    swipeable: {
      backgroundColor: 'red',
      borderColor: getColor(theme, 400),
      borderWidth: 2,
      borderRadius: 10,
    },
    pressable: {
      backgroundColor: '#FFF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
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
    rightAction: {
      width: 50,
      height: '100%',
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
