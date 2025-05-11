import Button from '@/components/base/Button';
import Text from '@/components/base/Text';
import {RootStackParamList} from '@/navigations/RootStack';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Pressable, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

export default function BackgroundPickerSection() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
      <Button
        mode="contained"
        onPress={() =>
          navigation.push('MockHome', {
            onDone: () => {
              navigation.pop();
            },
          })
        }>
        Change Background
      </Button>
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
