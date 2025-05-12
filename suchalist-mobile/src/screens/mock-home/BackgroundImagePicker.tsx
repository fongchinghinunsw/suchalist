import {BackgroundImage, themeActions} from '@/stores/theme';
import Icon from '@react-native-vector-icons/ionicons';
import {
  Image,
  ImageSourcePropType,
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
  images: ImageSourcePropType[];
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

      try {
        await RNFS.copyFile(sourceUri, destPath);
        dispatch(
          themeActions.setBackgroundImage({
            type: 'uri',
            uri: `file://${destPath}`,
          }),
        );
        onSelectImage({type: 'uri', uri: `file://${destPath}`});
      } catch (error) {
        console.error('Failed to copy file:', error);
      }
    }
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
        return (
          <Pressable
            key={index}
            style={[
              styles.imageWrapper,
              isSelected && styles.selectedImageWrapper,
            ]}
            onPress={() =>
              onSelectImage({
                type: 'asset',
                asset: image,
              })
            }>
            <Image source={image} style={styles.image} />
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
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectedImageWrapper: {
    borderWidth: 2,
    borderColor: '#FFF',
  },
  image: {
    width: 100,
    height: '100%',
    resizeMode: 'cover',
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
