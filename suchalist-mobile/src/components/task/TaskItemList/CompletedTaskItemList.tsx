import {Task} from '@/stores/tasks/types';
import TaskItemUngroupedList from './TaskItemUngroupedList';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Theme} from '@/stores/theme';
import {useSelector} from 'react-redux';
import {RootState} from '@/stores';
import {getColor} from '@/constants/styles';
import {useState} from 'react';

type Props = {
  tasks: Task[];
  setIsCompleted: (id: string, isCompleted: boolean) => void;
  onTaskItemPress: (task: Task) => void;
};

export default function CompletedTaskItemList(props: Props) {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyles(theme);

  const [isTasksVisible, setIsTasksVisible] = useState(false);

  const toggleTasks = () => {
    setIsTasksVisible(!isTasksVisible);
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={toggleTasks}>
          <Text style={styles.buttonText}>Show Completed Tasks</Text>
        </Pressable>
      </View>
      {isTasksVisible && <TaskItemUngroupedList {...props} />}
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
  });
};
