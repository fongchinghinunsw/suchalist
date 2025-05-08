import Text from '@/components/base/Text';
import {FolderResource} from '@/stores/tasks/types';
import Icon from '@react-native-vector-icons/ionicons';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {
  taskFolder: FolderResource;
  onPress: (taskListId: string) => void;
};

export default function TaskFolderItem({
  taskFolder: {title, taskLists},
  onPress,
}: Props) {
  const onToggleListItem = () => {
    console.log('toggle');
  };

  return (
    <Animated.View>
      <Pressable style={styles.container} onPress={onToggleListItem}>
        <Icon name="folder-open-outline" size={16} />
        <Text size="large">{title}</Text>
      </Pressable>
      <View style={styles.listsContainer}>
        {taskLists.map(list => {
          return (
            <Pressable
              key={list.id}
              style={styles.container}
              onPress={() => onPress(list.id)}>
              <Icon name="list-outline" size={16} />
              <Text size="large">{list.title}</Text>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },
  listsContainer: {
    paddingLeft: 12,
  },
});
