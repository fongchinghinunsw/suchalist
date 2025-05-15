import {getColor} from '@/constants/styles';
import {RootState} from '@/stores';
import {Task} from '@/services/task-service/types';
import {Theme} from '@/stores/theme';
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import TaskItemUngroupedList from './TaskItemUngroupedList';
import SoundPlayer from 'react-native-sound-player';

type Props = {
  tasks: Task[];
  onTaskItemPress: (task: Task) => void;
  onRemoveTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
  onUncompleteTask: (id: string) => void;
};

export default function CompletedTaskItemList(props: Props) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
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
    try {
      SoundPlayer.loadSoundFile('bubble_pop', 'mp3');
      SoundPlayer.setVolume(0.3);
      SoundPlayer.seek(0);
      SoundPlayer.play();
    } catch (e) {
      console.log('cannot play the sound file', e);
    }

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
