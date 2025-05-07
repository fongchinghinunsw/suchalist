import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '.';

export type Theme = 'neutral' | 'blue' | 'green' | 'red' | 'yellow' | 'purple';

const initialThemeState = {
  theme: 'blue',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});

export const selectTheme = (state: RootState): Theme => state.theme.theme;

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
