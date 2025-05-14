import Text from '@/components/base/Text';
import {selectListsMap} from '@/stores/tasks/tasks';
import Icon from '@react-native-vector-icons/ionicons';
import {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import TaskListItem from './TaskListItem';
import {FolderHeader} from './types';

type Props = {
  folderHeader: FolderHeader;
  onPress: (taskListId: string) => void;
  onDrag: () => void;
};

export default function TaskFolderItem({
  folderHeader: {title, lists},
  onPress,
  onDrag,
}: Props) {
  const listsMap = useSelector(selectListsMap);

  const [isExpanded, setIsExpanded] = useState(false);

  const onToggleListItem = () => {
    setIsExpanded(!isExpanded);
  };

  const folderItemIconName = isExpanded
    ? 'chevron-down-outline'
    : 'chevron-back-outline';

  return (
    <View>
      <Pressable
        style={styles.container}
        onPress={onToggleListItem}
        onLongPress={onDrag}>
        <View style={styles.titleContainer}>
          <Icon name="folder-open-outline" size={16} />
          <Text size="large">{title}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="ellipsis-horizontal-outline" size={16} />
          <Icon name={folderItemIconName} size={16} />
        </View>
      </Pressable>
      {isExpanded && (
        <View style={styles.listsContainer}>
          {lists.map(list => {
            const listItem = listsMap[list];
            return (
              <TaskListItem
                key={listItem.id}
                listHeader={{
                  type: 'LIST',
                  ...listItem,
                }}
                onPress={() => onPress(listItem.id)}
                onDrag={() => {}}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listsContainer: {
    paddingLeft: 12,
  },
});
