import Text from '@/components/base/Text';
import Icon from '@react-native-vector-icons/ionicons';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {FolderHeader} from './types';
import {useSelector} from 'react-redux';
import {selectListsMap} from '@/stores/tasks/tasks';

type Props = {
  folderHeader: FolderHeader;
  onPress: (taskListId: string) => void;
};

export default function TaskFolderItem({
  folderHeader: {title, lists},
  onPress,
}: Props) {
  const listsMap = useSelector(selectListsMap);

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
        {lists.map(list => {
          const listItem = listsMap[list];
          return (
            <Pressable
              key={listItem.id}
              style={styles.container}
              onPress={() => onPress(listItem.id)}>
              <Icon name="list-outline" size={16} />
              <Text size="large">{listItem.title}</Text>
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
