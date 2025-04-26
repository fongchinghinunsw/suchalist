import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type NotificationState = {
  dailyReminder: {
    isEnabled: boolean;
    datetime: string;
  };
};

const initialNotificationState: NotificationState = {
  dailyReminder: {
    isEnabled: false,
    datetime: new Date().toISOString(),
  },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    setDailyReminder(state, action: PayloadAction<string>) {
      state.dailyReminder.isEnabled = true;
      state.dailyReminder.datetime = action.payload;
    },
    disableDailyReminder(state) {
      state.dailyReminder.isEnabled = false;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;

export const DAILY_REMINDER_CHANNEL_ID = 'daily-reminder';
