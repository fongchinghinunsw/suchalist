import {StyleSheet, View} from 'react-native';
import Divider from '@/components/base/Divider';
import DailyReminderSection from './components/DailyReminderSection';
import ThemeSection from './components/ThemeSection';
import BackgroundPickerSection from './components/BackgroundPickerSection';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <ThemeSection />
      <Divider />
      <DailyReminderSection />
      <Divider />
      <BackgroundPickerSection />
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
