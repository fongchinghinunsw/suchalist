import Text from '@/components/base/Text';
import useForm from '@/hooks/useForm';
import {RootState} from '@/stores';
import {
  DAILY_REMINDER_CHANNEL_ID,
  notificationActions,
} from '@/stores/notification';
import {Platform, StyleSheet} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {useDispatch, useSelector} from 'react-redux';
import * as z from 'zod';
import TimeSectionIOS from './TimeSection.ios';
import TimeSectionAndroid from './TimeSection.android';

export const schema = z.object({
  time: z.date(),
  isEnabled: z.boolean(),
});

export type Schema = z.infer<typeof schema>;

export default function DailyReminderSection() {
  const dispatch = useDispatch();

  const datetimeString = useSelector<RootState, string>(
    state => state.notification.dailyReminder.datetime,
  );
  const datetime = new Date(datetimeString);
  const localizedTime = datetime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const isEnabled = useSelector<RootState, boolean>(
    state => state.notification.dailyReminder.isEnabled,
  );

  const {control, watch, setValue} = useForm<Schema>({
    schema,
    defaultValues: {
      time: datetime ?? new Date(),
      isEnabled,
    },
  });

  const timeValue = watch('time');

  const onConfirmTimeIOS = () => {
    scheduleDailyReminder(timeValue);
  };

  const onTimeChangeAndroid = (date: Date) => {
    console.log('onTimeChange', {date});
    setValue('time', date);

    scheduleDailyReminder(date);
  };

  const toggleReminder = (value: boolean) => {
    if (value) {
      console.log({value});
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

    console.log('Scheduled', {reminderTime});
    PushNotification.localNotificationSchedule({
      channelId: DAILY_REMINDER_CHANNEL_ID,
      id: 1,
      title: 'Daily Reminder',
      message: "Don't forget your TODOs today and plan for your next day!",
      date: reminderTime,
      repeatType: 'day',
      allowWhileIdle: true,
    });
  };

  const cancelReminder = () => {
    console.log('cancelReminder');
    PushNotification.cancelLocalNotification('1');
  };

  const TimeSection = Platform.select({
    ios: (
      <TimeSectionIOS
        localizedTime={localizedTime}
        control={control}
        onToggleEnableReminder={toggleReminder}
        onConfirmTime={onConfirmTimeIOS}
      />
    ),
    android: (
      <TimeSectionAndroid
        time={datetime}
        localizedTime={localizedTime}
        control={control}
        onToggleEnableReminder={toggleReminder}
        onTimeChange={onTimeChangeAndroid}
      />
    ),
  });

  return (
    <>
      <Text tone="neutral" shade={700} size="medium" style={styles.title}>
        Daily Reminder
      </Text>
      <Text tone="neutral" shade={700} size="small" style={styles.description}>
        Set a reminder to remind you about your TODOs.
      </Text>

      {TimeSection}
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
