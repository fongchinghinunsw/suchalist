import SoundPlayer from '@/components/SoundPlayer';
import {getColor} from '@/constants/styles';
import {Task} from '@/services/task-service/types';
import {selectTheme, Theme} from '@/stores/theme';
import {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {
  default as Animated,
  FadeInLeft,
  LinearTransition,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import Text from '../../../../base/Text';
import DeleteTaskModal from '../../../../modal/DeleteTaskModal';
import RightAction from './RightAction';
import Icon from '@react-native-vector-icons/ionicons';

type Props = {
  task: Task;
  onPress: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
  onUncompleteTask: (id: string) => void;
};

export default function TaskItem({
  task,
  onPress,
  onDeleteTask,
  onCompleteTask,
  onUncompleteTask,
}: Props) {
  const {id, title, isCompleted} = task;

  const theme = useSelector(selectTheme);
  const styles = getStyle(theme);

  // Controlling animation for completing a task
  const [isCompleting, setIsCompleting] = useState(false);

  const strikeThrough = useSharedValue(0);
  const strikeThroughStyle = useAnimatedStyle(() => {
    return {
      width: `${strikeThrough.value * 100}%`,
    };
  });

  // Remove Task Modal
  const [isDeleteTaskModalVisible, setIsDeleteTaskModalVisible] =
    useState(false);

  const toggleDeleteTaskModal = () => {
    setIsDeleteTaskModalVisible(!isDeleteTaskModalVisible);
  };

  const onConfirmDeleteTaskPressed = (taskId: string) => {
    onDeleteTask(taskId);
    setIsDeleteTaskModalVisible(false);
  };

  const onCompleteTaskCheckboxPressed = async (isChecked: boolean) => {
    if (!isChecked) {
      SoundPlayer.play('pop');
      onUncompleteTask(id);
    } else {
      setIsCompleting(true);
      strikeThrough.value = withTiming(1, {duration: 400});
      await new Promise(resolve => setTimeout(resolve, 400));

      SoundPlayer.play('ding');
      onCompleteTask(id);
    }
  };

  const EnteringAnimation = FadeInLeft.springify().damping(14);
  const ExitingAnimation = SlideOutRight.springify().damping(14);

  return (
    <>
      <Animated.View
        entering={EnteringAnimation}
        exiting={ExitingAnimation}
        layout={LinearTransition}
        style={[isCompleting && styles.completingTaskItem]}>
        <Swipeable
          containerStyle={styles.swipeable}
          renderRightActions={(_progress, drag) =>
            RightAction({
              drag,
              onDeleteTaskPressed: toggleDeleteTaskModal,
            })
          }
          overshootRight={false}>
          <Pressable style={styles.pressable} onPress={() => onPress(task)}>
            <View style={styles.titleWrapper}>
              <Text
                shade={700}
                numberOfLines={1}
                style={[isCompleted && styles.completedTitle]}>
                {title}
              </Text>
              {isCompleting && (
                <Animated.View
                  style={[styles.strikeThroughLine, strikeThroughStyle]}
                />
              )}
            </View>
            <View style={styles.rightSection}>
              <Icon name="star-outline" size={24} style={styles.starIcon} />
              <View>
                <BouncyCheckbox
                  size={24}
                  isChecked={isCompleted}
                  iconStyle={styles.checkboxIcon}
                  innerIconStyle={styles.checkboxInnerIcon}
                  fillColor={getColor(theme, 400)}
                  onPress={(isChecked: boolean) =>
                    onCompleteTaskCheckboxPressed(isChecked)
                  }
                />
              </View>
            </View>
          </Pressable>
        </Swipeable>
      </Animated.View>
      <DeleteTaskModal
        taskName={task.title}
        isVisible={isDeleteTaskModalVisible}
        onConfirm={() => onConfirmDeleteTaskPressed(task.id)}
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
      gap: 12,
    },
    completedTitle: {
      textDecorationLine: 'line-through',
    },
    rightSection: {
      gap: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    starIcon: {
      // backgroundColor: 'yellow',
      color: getColor(theme, 400),
    },
    checkboxIcon: {
      borderRadius: 8,
    },
    checkboxInnerIcon: {
      borderRadius: 8,
    },
    titleWrapper: {
      // make sure a long title doesn't push the checkbox off the view
      flexShrink: 1,
      position: 'relative',
      justifyContent: 'center',
    },
    innerTitleWrapper: {
      alignSelf: 'flex-start',
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
