import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../stores';
import {
  DAILY_REMINDER_CHANNEL_ID,
  notificationActions,
} from '../../stores/notification';
import Button from '../../components/base/Button';
import Text from '../../components/base/Text';
import Switch from '../../components/base/form/Switch';

export default function DailyReminderSection() {
  const dispatch = useDispatch();

  const datetimeString = useSelector<RootState, string>(
    state => state.notification.dailyReminder.datetime,
  );
  const datetime = new Date(datetimeString);
  const localizedDatetime = datetime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const isEnabled = useSelector<RootState, boolean>(
    state => state.notification.dailyReminder.isEnabled,
  );

  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, time?: Date) => {
    setShowTimePicker(false);
    if (event.type === 'dismissed') {
      return;
    }

    if (time) {
      dispatch(notificationActions.setDailyReminder(time.toISOString()));
      scheduleDailyReminder(time);
    }
  };

  const toggleReminder = (value: boolean) => {
    if (value) {
      dispatch(notificationActions.setDailyReminder(datetimeString));
    } else {
      dispatch(notificationActions.disableDailyReminder());
      cancelReminder();
    }
  };

  const scheduleDailyReminder = (time: Date) => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hour);
    reminderTime.setMinutes(minute);
    reminderTime.setSeconds(0);

    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }
    dispatch(notificationActions.setDailyReminder(reminderTime.toISOString()));

    PushNotification.localNotificationSchedule({
      channelId: DAILY_REMINDER_CHANNEL_ID,
      id: 1,
      title: 'Daily Reminder',
      message: "Don't forget your TODOs today and plan for your next day!",
      date: reminderTime,
      repeatType: 'day',
      allowWhileIdle: true,
    });

    console.log('Scheduled for:', reminderTime.toISOString());
  };

  const cancelReminder = () => {
    PushNotification.cancelLocalNotification('1');
  };

  return (
    <>
      <Text tone="neutral" shade={700} size="medium" style={styles.title}>
        Daily Reminder
      </Text>
      <Text tone="neutral" shade={700} size="small" style={styles.description}>
        Set a reminder to remind you about your TODOs.
      </Text>

      <View style={styles.reminderRow}>
        <Text tone="neutral" style={styles.reminderLabel}>
          {localizedDatetime}
        </Text>
        <Switch value={isEnabled} onValueChange={toggleReminder} />
      </View>

      <Button
        mode="contained"
        style={styles.changTimeButton}
        onPress={() => setShowTimePicker(true)}>
        Change Time
      </Button>

      {showTimePicker && (
        <DateTimePicker
          value={datetime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
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
    fontWeight: '500',
  },
  changTimeButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
});
