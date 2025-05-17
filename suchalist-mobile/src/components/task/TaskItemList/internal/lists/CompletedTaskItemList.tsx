import SoundPlayer from '@/components/SoundPlayer';
import {getColor} from '@/constants/styles';
import {Task} from '@/services/task-service/types';
import {selectTheme, Theme} from '@/stores/theme';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import TaskItemUngroupedList from './TaskItemUngroupedList';

type Props = {
  tasks: Task[];
  onTaskItemPress: (task: Task) => void;
  onStarTask: (id: string, isStarred: boolean) => void;
  onDeleteTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
  onUncompleteTask: (id: string) => void;
};

export default function CompletedTaskItemList(props: Props) {
  const theme = useSelector(selectTheme);
  const styles = getStyles(theme);

  const [isTasksVisible, setIsTasksVisible] = useState(false);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, {
      stiffness: 400,
      damping: 30,
      mass: 0.4,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      stiffness: 400,
      damping: 30,
      mass: 0.4,
    });
  };

  const toggleTasks = () => {
    SoundPlayer.play('bubble_pop');
    setIsTasksVisible(!isTasksVisible);
  };

  return (
    <>
      <Animated.View style={[styles.buttonContainer, animatedStyle]}>
        <Pressable
          style={styles.button}
          onPress={toggleTasks}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}>
          <Text style={styles.buttonText}>Show Completed Tasks</Text>
        </Pressable>
      </Animated.View>
      {isTasksVisible && (
        <View style={styles.listContainer}>
          <TaskItemUngroupedList {...props} />
        </View>
      )}
    </>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: getColor(theme, 500),
      borderRadius: 4,
      padding: 8,
    },
    buttonText: {
      color: '#FFF',
      fontWeight: 800,
    },
    listContainer: {
      marginBottom: 72,
    },
  });
};
