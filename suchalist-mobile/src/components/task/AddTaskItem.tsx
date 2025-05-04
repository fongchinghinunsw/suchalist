import {Theme} from '@/stores/theme';
import {StyleSheet, TextInput, View} from 'react-native';
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
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      height: 48,
      padding: 12,
      backgroundColor: getColor(theme, 400),
      borderRadius: 10,
    },
    input: {
      flex: 1,
      color: '#FFF',
      fontSize: 18,
    },
  });
};
