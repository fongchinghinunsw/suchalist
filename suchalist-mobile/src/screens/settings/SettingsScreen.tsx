import {StyleSheet, View} from 'react-native';
import Divider from '../../components/base/Divider';
import DailyReminderSection from './DailyReminderSection';
import ThemeSection from './ThemeSection';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <ThemeSection />
      <Divider />
      <DailyReminderSection />
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 5,
  },
});
