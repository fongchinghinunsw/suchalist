import {Image, Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

type Props = {
  images: any[];
  selectedImage: any;
  onSelectImage: (image: any) => void;
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
        return (
          <Pressable
            key={index}
            style={[
              styles.imageWrapper,
              //   {marginBottom: bottom},
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
    // backgroundColor: 'green',
    flexDirection: 'row',
    gap: 8,
  },
  imageWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  unselectedImageWrapper: {},
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
