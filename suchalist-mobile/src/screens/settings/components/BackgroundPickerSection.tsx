import Button from '@/components/base/Button';
import Text from '@/components/base/Text';
import {RootStackParamList} from '@/navigations/RootStack';
import {BackgroundImage, themeActions} from '@/stores/theme';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

export default function BackgroundPickerSection() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  return (
    <>
      <Text tone="neutral" shade={700} size="medium" style={styles.title}>
        App Background
      </Text>
      <Text tone="neutral" shade={700} size="small" style={styles.description}>
        Set a background for your TODO list.
      </Text>

      <Button
        mode="contained"
        onPress={() =>
          navigation.push('MockHome', {
            onDone: (image: BackgroundImage) => {
              console.log('BackgroundPickerSection', image);
              dispatch(themeActions.setBackgroundImage(image));
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
});
