import Switch from '@/components/base/form/Switch';
import Text from '@/components/base/Text';
import DateTimePicker from '@/components/task/DateTimePicker/DateTimePicker';
import useForm from '@/hooks/useForm';
import {RootState} from '@/stores';
import {
  DAILY_REMINDER_CHANNEL_ID,
  notificationActions,
} from '@/stores/notification';
import {StyleSheet} from 'react-native';
import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as z from 'zod';

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

  const timeWatchValue = watch('time');

  const onDateTimePickerConfirm = (date: Date) => {
    setValue('time', date);
    scheduleDailyReminder(date);
  };

  const onToggleReminder = (value: boolean) => {
    if (value) {
      dispatch(
        notificationActions.setDailyReminder(timeWatchValue.toISOString()),
      );
    } else {
      dispatch(notificationActions.disableDailyReminder());
      cancelReminder();
    }
  };

  const scheduleDailyReminder = async (time: Date) => {
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

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: reminderTime.getTime(), // Milliseconds
      repeatFrequency: RepeatFrequency.DAILY,
      alarmManager: true, // Ensure it works reliably in Doze mode
    };

    await notifee.createTriggerNotification(
      {
        id: 'daily-reminder',
        title: 'Daily Reminder',
        body: "Don't forget your TODOs today and plan for your next day!",
        android: {
          channelId: DAILY_REMINDER_CHANNEL_ID,
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger,
    );
  };

  const cancelReminder = async () => {
    await notifee.cancelNotification('daily-reminder');
  };

  return (
    <>
      <Text tone="neutral" shade={700} size="medium" style={styles.title}>
        Daily Reminder
      </Text>
      <Text tone="neutral" shade={700} size="small" style={styles.description}>
        Set a reminder to remind you about your TODOs.
      </Text>

      <Switch
        name="toggleDailyReminder"
        label={localizedTime}
        control={control}
        onClick={onToggleReminder}
        value={isEnabled}
      />

      <DateTimePicker
        name="datetime"
        value={timeWatchValue}
        isTextInputVisible={isEnabled}
        androidOptions={{
          mode: 'time',
        }}
        iosOptions={{
          mode: 'time',
          display: 'spinner',
        }}
        control={control}
        onConfirm={onDateTimePickerConfirm}
      />
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
