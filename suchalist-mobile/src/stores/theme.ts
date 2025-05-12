import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '.';
import {ImageSourcePropType} from 'react-native';

export type Theme = 'neutral' | 'blue' | 'green' | 'red' | 'yellow' | 'purple';

export type BackgroundImage =
  | {type: 'uri'; uri: string}
  | {type: 'asset'; asset: ImageSourcePropType};

const DEFAULT_BACKGROUND_IMAGES: BackgroundImage[] = [
  {
    type: 'asset',
    asset: require('@/assets/images/water-paint.jpg'),
  },
  {
    type: 'asset',
    asset: require('@/assets/images/lighthouse.jpg'),
  },
  {
    type: 'asset',
    asset: require('@/assets/images/golden-gate-bridge.jpg'),
  },
  {
    type: 'asset',
    asset: require('@/assets/images/hill-peak.jpg'),
  },
  {
    type: 'asset',
    asset: require('@/assets/images/tokyo-tv-tower.jpg'),
  },
];

const PRESETS: {
  theme: Theme;
  backgroundImage: BackgroundImage;
}[] = [
  {
    theme: 'blue',
    backgroundImage: DEFAULT_BACKGROUND_IMAGES[0],
  },
  {
    theme: 'purple',
    backgroundImage: DEFAULT_BACKGROUND_IMAGES[1],
  },
  {
    theme: 'green',
    backgroundImage: DEFAULT_BACKGROUND_IMAGES[2],
  },
  {
    theme: 'yellow',
    backgroundImage: DEFAULT_BACKGROUND_IMAGES[3],
  },
  {
    theme: 'red',
    backgroundImage: DEFAULT_BACKGROUND_IMAGES[4],
  },
];

const initialThemeState = {
  ...PRESETS[0],
  backgroundImages: DEFAULT_BACKGROUND_IMAGES,
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
    },
    addBackgroundImage(state, action: PayloadAction<BackgroundImage>) {
      const exists = state.backgroundImages.some(img => {
        if (img.type === 'uri' && action.payload.type === 'uri') {
          return img.uri === action.payload.uri;
        }
        if (img.type === 'asset' && action.payload.type === 'asset') {
          return img.asset === action.payload.asset;
        }
        return false;
      });

      if (!exists) {
        state.backgroundImages.push(action.payload);
      }
    },
    removeBackgroundImage(state, action: PayloadAction<BackgroundImage>) {
      state.backgroundImages = state.backgroundImages.filter(img => {
        if (img.type === 'uri' && action.payload.type === 'uri') {
          return img.uri !== action.payload.uri;
        }
        if (img.type === 'asset' && action.payload.type === 'asset') {
          return img.asset !== action.payload.asset;
        }
        return true;
      });
    },
  },
});

export const selectTheme = (state: RootState): Theme => state.theme.theme;

export const selectBackgroundImage = (state: RootState): BackgroundImage =>
  state.theme.backgroundImage;

export const selectBackgroundImages = (state: RootState): BackgroundImage[] =>
  state.theme.backgroundImages;

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
