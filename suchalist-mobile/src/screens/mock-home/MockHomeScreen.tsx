import Text from '@/components/base/Text';
import TaskItemList from '@/components/task/TaskItemList/TaskItemList';
import {
  BackgroundImage,
  selectBackgroundImage,
  selectBackgroundImages,
} from '@/stores/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLayoutEffect, useState} from 'react';
import {ImageBackground, Pressable, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import BackgroundImagePicker from './BackgroundImagePicker';
import {LIST} from './fake';

export default function MockHomeScreen() {
  const backgroundImage = useSelector(selectBackgroundImage);
  const backgroundImages = useSelector(selectBackgroundImages);

  const [selectedImage, setSelectedImage] =
    useState<BackgroundImage>(backgroundImage);

  const onSelectImage = (image: BackgroundImage) => {
    console.log('onSelectImage', {image});
    setSelectedImage(image);
  };

  const navigation = useNavigation();
  const route = useRoute<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        renderHeaderRight(() => route.params?.onDone?.(selectedImage)),
    });
  }, [navigation, route.params, route.params.onDone, selectedImage]);

  const noOp = () => {};

  const source =
    selectedImage.type === 'uri'
      ? {uri: selectedImage.uri}
      : selectedImage.asset;

  return (
    <ImageBackground
      source={source}
      resizeMode="cover"
      style={styles.background}>
      <TaskItemList
        list={LIST}
        showAddTaskDrawer={noOp}
        onTaskItemPress={noOp}
        onAddTask={noOp}
        onDeleteTask={noOp}
        onScroll={noOp}
      />

      <BackgroundImagePicker
        images={backgroundImages}
        selectedImage={selectedImage}
        onSelectImage={onSelectImage}
      />
    </ImageBackground>
  );
}

export function renderHeaderRight(onPress: () => void) {
  return (
    <Pressable onPress={onPress} style={styles.headerRight}>
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
