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
import { themeActions } from '@renderer/stores/theme';
import { useDispatch } from 'react-redux';

const IMAGES = [
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
];

export default function BackgroundImagePicker() {
  const dispatch = useDispatch();

  const setBackgroundImage = (image: string) => {
    dispatch(themeActions.setBackgroundImage(image));
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-row gap-3">
        {IMAGES.map((image) => {
          return (
            <div
              key={image}
              className="h-30 w-20 rounded-xl overflow-hidden shrink-0"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={() => setBackgroundImage(image)}
            />
          );
        })}
      </div>
    </div>
  );
}
