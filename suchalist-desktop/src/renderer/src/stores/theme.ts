import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export type Theme = 'blue' | 'green' | 'red' | 'yellow' | 'purple';

type State = {
  theme: Theme;
};

const initialThemeState: State = {
  theme: 'blue'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    }
  }
});

export const selectTheme = (state: RootState): Theme => state.theme.theme;

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
