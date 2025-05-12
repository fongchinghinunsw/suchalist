import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

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
});
