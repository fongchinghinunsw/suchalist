import {getColor} from '@/constants/styles';
import {selectTheme, Theme} from '@/stores/theme';
import Icon from '@react-native-vector-icons/ionicons';
import {StyleSheet} from 'react-native';
import {AnimatedFAB} from 'react-native-paper';
import {useSelector} from 'react-redux';

const FabIcon = () => <Icon name="add-outline" size={24} color="#fff" />;

type Props = {
  label: string;
  isExtended: boolean;
  onPress: () => void;
};

export default function FAB({label, isExtended, onPress}: Props) {
  const theme = useSelector(selectTheme);
  const styles = getStyles(theme);

  return (
    <AnimatedFAB
      icon={FabIcon}
      label={label}
      extended={isExtended}
      onPress={onPress}
      animateFrom="right"
      iconMode="dynamic"
      color="#FFF"
      style={styles.fab}
    />
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    fab: {
      bottom: 32,
      right: 32,
      position: 'absolute',
      backgroundColor: getColor(theme, 600),
    },
  });
};
