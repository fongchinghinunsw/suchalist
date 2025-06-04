import { default as bluePaint } from '@/assets/images/blue-paint.jpg';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export type Theme = 'blue' | 'green' | 'red' | 'yellow' | 'purple';

type State = {
  theme: Theme;
  backgroundImage: string;
};

const initialThemeState: State = {
  theme: 'blue',
  backgroundImage: bluePaint
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setBackgroundImage(state, action: PayloadAction<string>) {
      state.backgroundImage = action.payload;
    }
  }
});

export const selectTheme = (state: RootState): Theme => state.theme.theme;
export const selectBackgroundImage = (state: RootState): string => state.theme.backgroundImage;

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
