import {getColor} from '@/constants/styles';
import {RootState} from '@/stores';
import {Task} from '@/stores/tasks/types';
import {Theme} from '@/stores/theme';
import Icon from '@react-native-vector-icons/ionicons';
import {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import SoundPlayer from 'react-native-sound-player';
import {useSelector} from 'react-redux';
import Text from '../base/Text';
import DeleteTaskModal from '../modal/DeleteTaskModel';

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

  const [isDeleteTaskModalVisible, setIsDeleteTaskModalVisible] =
    useState(false);

  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyle(theme);

  const toggleDeleteTaskModal = () => {
    setIsDeleteTaskModalVisible(!isDeleteTaskModalVisible);
  };

  const onDeleteTask = (taskId: string) => {
    onRemoveTask(taskId);
    setIsDeleteTaskModalVisible(false);
  };

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
    <>
      <Swipeable
        containerStyle={styles.swipeable}
        renderRightActions={(progress, drag) =>
          RightAction({
            progress,
            drag,
            onPressDeleteTask: toggleDeleteTaskModal,
          })
        }
        overshootRight={false}>
        <Pressable style={styles.pressable} onPress={() => onPress(task)}>
          <Text
            shade={700}
            numberOfLines={1}
            style={[styles.title, isCompleted && styles.titleCompleted]}>
            {title}
          </Text>
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
      <DeleteTaskModal
        taskName={task.title}
        isVisible={isDeleteTaskModalVisible}
        onConfirm={() => onDeleteTask(task.id)}
        onCancel={toggleDeleteTaskModal}
      />
    </>
  );
}

type RightActionProps = {
  progress: SharedValue<number>;
  drag: SharedValue<number>;
  onPressDeleteTask: () => void;
};

function RightAction({drag, onPressDeleteTask}: RightActionProps) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyle(theme);

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drag.value + styles.rightAction.width}],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Pressable style={styles.rightAction} onPress={onPressDeleteTask}>
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
