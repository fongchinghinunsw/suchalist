import { default as bluePaint } from '@/assets/images/blue-paint.jpg';
import { default as crystal } from '@/assets/images/crystal.jpg';
import { default as greenBlueSky } from '@/assets/images/green-blue-sky.jpg';
import { default as greyWall } from '@/assets/images/grey-wall.jpg';
import { default as pinkPaint } from '@/assets/images/pink-paint.jpg';
import { default as pinkWall } from '@/assets/images/pink-wall.jpg';
import { default as pinkWater } from '@/assets/images/pink-water.jpg';
import { default as realWater } from '@/assets/images/real-water.jpg';
import { default as redSand } from '@/assets/images/red-sand.jpg';
import { default as waterPaint } from '@/assets/images/water-paint.jpg';
import { default as yellowWall } from '@/assets/images/yellow-wall.jpg';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

const BUILTIN_BACKGROUND_IMAGES = [
  waterPaint,
  bluePaint,
  crystal,
  greenBlueSky,
  greyWall,
  pinkPaint,
  pinkWall,
  pinkWater,
  realWater,
  redSand,
  yellowWall
].map((image) => ({ type: 'builtin' as const, uri: image }));

export type Theme = 'blue' | 'green' | 'red' | 'yellow' | 'purple';

export type BackgroundImage = { type: 'builtin' | 'custom'; uri: string };

type State = {
  theme: Theme;
  backgroundImage: BackgroundImage;
  backgroundImages: BackgroundImage[];
};

const initialThemeState: State = {
  theme: 'blue',
  backgroundImage: BUILTIN_BACKGROUND_IMAGES[0],
  backgroundImages: BUILTIN_BACKGROUND_IMAGES
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setBackgroundImage(state, action: PayloadAction<BackgroundImage>) {
      state.backgroundImage = action.payload;
    }
  }
});

export const selectTheme = (state: RootState): Theme => state.theme.theme;
export const selectBackgroundImage = (state: RootState): BackgroundImage =>
  state.theme.backgroundImage;
export const selectBackgroundImages = (state: RootState): BackgroundImage[] =>
  state.theme.backgroundImages;

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
