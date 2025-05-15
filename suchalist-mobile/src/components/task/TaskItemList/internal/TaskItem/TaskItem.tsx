import {getColor} from '@/constants/styles';
import {Task} from '@/services/task-service/types';
import {RootState} from '@/stores';
import {Theme} from '@/stores/theme';
import {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {
  default as Animated,
  LinearTransition,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import SoundPlayer from 'react-native-sound-player';
import {useSelector} from 'react-redux';
import Text from '../../../../base/Text';
import DeleteTaskModal from '../../../../modal/DeleteTaskModal';
import RightAction from './RightAction';

type Props = {
  task: Task;
  onPress: (task: Task) => void;
  onRemoveTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
  onUncompleteTask: (id: string) => void;
};

export default function TaskItem({
  task,
  onPress,
  onRemoveTask,
  onCompleteTask,
  onUncompleteTask,
}: Props) {
  const {id, title, isCompleted} = task;

  const [isCompleting, setIsCompleting] = useState(false);

  const strikeThrough = useSharedValue(0);

  const strikeThroughStyle = useAnimatedStyle(() => {
    return {
      width: `${strikeThrough.value * 100}%`,
    };
  });

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

  const onCompleteTaskCheckboxPressed = async (isChecked: boolean) => {
    if (!isChecked) {
      try {
        SoundPlayer.loadSoundFile('pop', 'mp3');
        SoundPlayer.seek(0);
        SoundPlayer.play();
      } catch (e) {
        console.log('cannot play the sound file', e);
      }
      onUncompleteTask(id);
    } else {
      try {
        setIsCompleting(true);
        strikeThrough.value = withTiming(1, {duration: 400});
        await new Promise(resolve => setTimeout(resolve, 400));

        SoundPlayer.loadSoundFile('ding', 'mp3');
        SoundPlayer.seek(0);
        SoundPlayer.play();
      } catch (e) {
        console.log('cannot play the sound file', e);
      }
      onCompleteTask(id);
    }
  };

  const ExitingAnimation = SlideOutRight.duration(500);

  return (
    <>
      <Animated.View
        exiting={ExitingAnimation}
        layout={LinearTransition}
        style={[isCompleting && styles.completingTaskItem]}>
        <Swipeable
          containerStyle={styles.swipeable}
          renderRightActions={(_progress, drag) =>
            RightAction({
              drag,
              onRemoveTaskPress: toggleDeleteTaskModal,
            })
          }
          overshootRight={false}>
          <Pressable style={styles.pressable} onPress={() => onPress(task)}>
            <View style={styles.titleWrapper}>
              <Text
                shade={700}
                numberOfLines={1}
                style={[isCompleted && styles.titleCompleted]}>
                {title}
              </Text>
              {isCompleting && (
                <Animated.View
                  style={[styles.strikeThroughLine, strikeThroughStyle]}
                />
              )}
            </View>
            <View style={styles.checkbox}>
              <BouncyCheckbox
                isChecked={isCompleted}
                iconStyle={styles.checkboxIcon}
                innerIconStyle={styles.checkboxInnerIcon}
                fillColor={getColor(theme, 400)}
                onPress={(isChecked: boolean) =>
                  onCompleteTaskCheckboxPressed(isChecked)
                }
              />
            </View>
          </Pressable>
        </Swipeable>
      </Animated.View>
      <DeleteTaskModal
        taskName={task.title}
        isVisible={isDeleteTaskModalVisible}
        onConfirm={() => onDeleteTask(task.id)}
        onCancel={toggleDeleteTaskModal}
      />
    </>
  );
}

const getStyle = (theme: Theme) => {
  return StyleSheet.create({
    completingTaskItem: {
      zIndex: 1,
    },
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
    titleWrapper: {
      position: 'relative',
      justifyContent: 'center',
    },
    strikeThroughLine: {
      position: 'absolute',
      height: 1,
      backgroundColor: getColor(theme, 700),
      top: '40%',
      left: 0,
    },
  });
};
