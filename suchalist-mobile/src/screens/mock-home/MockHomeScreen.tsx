import Text from '@/components/base/Text';
import TaskItemList from '@/components/task/TaskItemList/TaskItemList';
import {ImageBackground, Pressable, StyleSheet} from 'react-native';
import {TASKS} from './fake';
import BackgroundImagePicker from './BackgroundImagePicker';
import {useState} from 'react';

const backgroundImage = require('@/assets/images/golden-gate-bridge.jpg');

const images = [
  require('@/assets/images/water-paint.jpg'),
  require('@/assets/images/lighthouse.jpg'),
  require('@/assets/images/golden-gate-bridge.jpg'),
  require('@/assets/images/hill-peak.jpg'),
  require('@/assets/images/tokyo-tv-tower.jpg'),
];

export default function MockHomeScreen() {
  const [selectedImage, setSelectedImage] = useState(backgroundImage);

  const onSelectImage = (image: any) => {
    setSelectedImage(image);
  };

  const noOp = () => {};

  return (
    <ImageBackground
      source={selectedImage}
      resizeMode="cover"
      style={styles.background}>
      <TaskItemList
        tasks={TASKS}
        setIsCompleted={noOp}
        showAddTaskDrawer={noOp}
        onTaskItemPress={noOp}
        onAddTask={noOp}
        onRemoveTask={noOp}
        onScroll={noOp}
      />

      <BackgroundImagePicker
        images={images}
        selectedImage={selectedImage}
        onSelectImage={onSelectImage}
      />
    </ImageBackground>
  );
}

export function renderHeaderRight(onDone: () => void) {
  return (
    <Pressable
      onPress={() => {
        onDone();
      }}
      style={styles.headerRight}>
      <Text shade={900}>Done</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  tasksListContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerRight: {
    marginRight: 16,
    padding: 4,
  },
});
