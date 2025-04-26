import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ColorBox from '../../components/ColorBox';
import {getColor, THEMES} from '../../constants/styles';
import {Theme, themeActions} from '../../stores/theme';
import Text from '../../components/base/Text';

export default function ThemeSection() {
  const dispatch = useDispatch();

  const setTheme = (theme: Theme) => {
    dispatch(themeActions.setTheme(theme));
  };

  return (
    <>
      <Text tone="neutral" shade={700} size="medium" style={styles.title}>
        App Theme
      </Text>
      <View style={styles.appThemeChoices}>
        {THEMES.filter(theme => theme !== 'neutral').map(theme => (
          <View key={theme} style={styles.boxWrapper}>
            <ColorBox
              color={getColor(theme, 600)}
              onClick={() => setTheme(theme)}
            />
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 12,
    marginBottom: 12,
  },
  appThemeChoices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  boxWrapper: {
    marginRight: 12,
    marginBottom: 12,
  },
  reminderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reminderLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  reminderTime: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 12,
  },
});
