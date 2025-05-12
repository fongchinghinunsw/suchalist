import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '.';
import {ImageSourcePropType} from 'react-native';

export type Theme = 'neutral' | 'blue' | 'green' | 'red' | 'yellow' | 'purple';

export type BackgroundImage =
  | {type: 'uri'; uri: string}
  | {type: 'asset'; asset: ImageSourcePropType};

const PRESETS: {
  theme: Theme;
  backgroundImage: BackgroundImage;
}[] = [
  {
    theme: 'blue',
    backgroundImage: require('@/assets/images/water-paint.jpg'),
  },
  {
    theme: 'purple',
    backgroundImage: require('@/assets/images/lighthouse.jpg'),
  },
  {
    theme: 'green',
    backgroundImage: require('@/assets/images/golden-gate-bridge.jpg'),
  },
  {
    theme: 'yellow',
    backgroundImage: require('@/assets/images/hill-peak.jpg'),
  },
  {
    theme: 'red',
    backgroundImage: require('@/assets/images/tokyo-tv-tower.jpg'),
  },
];

const initialThemeState = PRESETS[0];

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setBackgroundImage(state, action: PayloadAction<BackgroundImage>) {
      state.backgroundImage = action.payload;
    },
  },
});

export const selectTheme = (state: RootState): Theme => state.theme.theme;

export const selectBackgroundImage = (state: RootState): BackgroundImage =>
  state.theme.backgroundImage;

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
