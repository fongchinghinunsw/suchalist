import Icon from '@react-native-vector-icons/ionicons';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';

type Props = {
  images: ImageSourcePropType[];
  selectedImage: ImageSourcePropType;
  onSelectImage: (image: ImageSourcePropType) => void;
};

export default function BackgroundImagePicker({
  images,
  selectedImage,
  onSelectImage,
}: Props) {
  const {height} = useWindowDimensions();

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
    console.log('hey');
    console.log({result});
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
            onPress={() => onSelectImage(image)}>
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
