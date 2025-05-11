import Text from '@/components/base/Text';
import Icon from '@react-native-vector-icons/ionicons';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {FolderHeader} from './types';
import {useSelector} from 'react-redux';
import {selectListsMap} from '@/stores/tasks/tasks';
import {useState} from 'react';

type Props = {
  folderHeader: FolderHeader;
  onPress: (taskListId: string) => void;
};

export default function TaskFolderItem({
  folderHeader: {title, lists},
  onPress,
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
    <Animated.View>
      <Pressable style={styles.container} onPress={onToggleListItem}>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Icon name="folder-open-outline" size={16} />
            <Text size="large">{title}</Text>
          </View>
          <Icon name={folderItemIconName} size={16} />
        </View>
      </Pressable>
      {isExpanded && (
        <View style={styles.listsContainer}>
          {lists.map(list => {
            const listItem = listsMap[list];
            return (
              <Pressable
                key={listItem.id}
                style={styles.listItemContainer}
                onPress={() => onPress(listItem.id)}>
                <Icon name="list-outline" size={16} />
                <Text size="large">{listItem.title}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listsContainer: {
    paddingLeft: 12,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },
});
