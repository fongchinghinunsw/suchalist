import Text from '@/components/base/Text';
import {Pressable, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

export default function BackgroundPickerSection() {
  const onOpenBackgroundPicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    console.log({result});
  };
  return (
    <>
      <Text tone="neutral" shade={700} size="medium" style={styles.title}>
        App Background
      </Text>
      <Text tone="neutral" shade={700} size="small" style={styles.description}>
        Set a background for your TODO list.
      </Text>
      <Pressable
        style={styles.backgroundPicker}
        onPress={onOpenBackgroundPicker}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    marginBottom: 12,
  },
  backgroundPicker: {
    height: 80,
    width: '100%',
    backgroundColor: 'green',
  },
});
