import {BackgroundImage, themeActions} from '@/stores/theme';
import Icon from '@react-native-vector-icons/ionicons';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import RNFS from 'react-native-fs';
import {ScrollView} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';

type Props = {
  images: BackgroundImage[];
  selectedImage: BackgroundImage;
  onSelectImage: (image: BackgroundImage) => void;
};

export default function BackgroundImagePicker({
  images,
  selectedImage,
  onSelectImage,
}: Props) {
  const {height} = useWindowDimensions();
  const dispatch = useDispatch();

  const scrollViewHeight = height / 5;

  const onOpenBackgroundPicker = async () => {
    console.log('onOpenBackgroundPicker');
    const result = await launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      res => {
        console.log({res});
      },
    );

    console.log({result});
    if (result.assets?.length) {
      const sourceUri = result.assets[0].uri;
      if (!sourceUri) {
        return;
      }

      const fileName = sourceUri.split('/').pop();
      const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      console.log({destPath});

      try {
        const image: BackgroundImage = {
          type: 'uri',
          uri: `file://${destPath}`,
        };
        await RNFS.copyFile(sourceUri, destPath);
        dispatch(themeActions.addBackgroundImage(image));
        onSelectImage({type: 'uri', uri: `file://${destPath}`});
      } catch (error) {
        console.error('Failed to copy file:', error);
      }
    }
  };

  const removeBackgroundImage = async (image: BackgroundImage) => {
    if (image.type === 'uri') {
      const filePath = image.uri.replace('file://', '');
      try {
        const exists = await RNFS.exists(filePath);
        if (exists) {
          await RNFS.unlink(filePath);
        }
      } catch (err) {
        console.warn('Failed to delete file:', err);
      }
    }
    dispatch(themeActions.removeBackgroundImage(image));
  };

  return (
    <ScrollView
      horizontal
      contentContainerStyle={[
        styles.scrollContainer,
        {height: scrollViewHeight},
      ]}
      showsHorizontalScrollIndicator={false}>
      {images.map((image, index) => {
        const isSelected = selectedImage === image;
        console.log({image, index});
        const source = image.type === 'uri' ? {uri: image.uri} : image.asset;
        const isCustom = image.type === 'uri';
        console.log({isCustom});

        return (
          <Pressable
            key={index}
            style={[
              styles.imageWrapper,
              isSelected && styles.selectedImageWrapper,
            ]}
            onPress={() => onSelectImage(image)}>
            {isCustom && (
              <Icon
                name="close-circle"
                color="red"
                style={styles.deleteButton}
                size={24}
                onPress={() => removeBackgroundImage(image)}
              />
            )}
            <Image source={source} style={styles.image} />
          </Pressable>
        );
      })}
      <Pressable
        style={styles.backgroundPicker}
        onPress={onOpenBackgroundPicker}>
        <Icon name="image-outline" color="#FFF" size={24} />
        <Text style={styles.addFromDeviceButton}>Add From Device</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 8,
  },
  imageWrapper: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectedImageWrapper: {
    borderColor: '#FFF',
  },
  image: {
    width: 100,
    height: '100%',
    resizeMode: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0,
    backgroundColor: '#FFF',
    width: 24,
    height: 24,
    borderRadius: '100%',
  },
  backgroundPicker: {
    borderRadius: 8,
    width: 100,
    height: '100%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFromDeviceButton: {
    color: '#FFF',
    textAlign: 'center',
  },
});
