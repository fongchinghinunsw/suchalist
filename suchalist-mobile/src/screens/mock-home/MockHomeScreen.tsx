import Text from '@/components/base/Text';
import TaskItemList from '@/components/task/TaskItemList/TaskItemList';
import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from 'react-native';
import {TASKS} from './fake';
import BackgroundImagePicker from './BackgroundImagePicker';
import {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const backgroundImage = require('@/assets/images/golden-gate-bridge.jpg');

const images = [
  require('@/assets/images/water-paint.jpg'),
  require('@/assets/images/lighthouse.jpg'),
  require('@/assets/images/golden-gate-bridge.jpg'),
  require('@/assets/images/hill-peak.jpg'),
  require('@/assets/images/tokyo-tv-tower.jpg'),
];

export default function MockHomeScreen() {
  const [selectedImage, setSelectedImage] =
    useState<ImageSourcePropType>(backgroundImage);

  const onSelectImage = (image: ImageSourcePropType) => {
    console.log('onSelectImage', {image});
    setSelectedImage(image);
  };

  const navigation = useNavigation();
  const route = useRoute<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            console.log('useLayoutEffect', {selectedImage});
            return route.params?.onDone?.(selectedImage);
          }}
          style={styles.headerRight}>
          <Text shade={900}>Done</Text>
        </Pressable>
      ),
    });
  }, [navigation, route.params, route.params.onDone, selectedImage]);

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
