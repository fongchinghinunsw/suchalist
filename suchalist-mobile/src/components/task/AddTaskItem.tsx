import {Theme} from '@/stores/theme';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/stores';
import {getColor} from '@/constants/styles';
import Icon from '@react-native-vector-icons/ionicons';

export default function AddTaskItem() {
  const theme = useSelector<RootState, Theme>(state => state.theme.theme);
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Icon name="add-outline" size={24} color="#fff" />
      <TextInput style={styles.input} />
    </View>
  );
}

const getStyles = (theme: Theme) => {
  const paddingVertical = Platform.select({
    ios: 12,
    android: 6,
  });

  const paddingHorizontal = Platform.select({
    ios: 12,
    android: 12,
  });

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical,
      paddingHorizontal,
      backgroundColor: getColor(theme, 400),
      borderRadius: 10,
    },
    input: {
      flex: 1,
      color: '#FFF',
      fontSize: 16,
    },
  });
};
