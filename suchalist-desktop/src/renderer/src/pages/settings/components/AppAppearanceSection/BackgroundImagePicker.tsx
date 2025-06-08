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
import Text from '@/components/base/Text';
import { selectTheme } from '@renderer/stores/theme';
import { getBackgroundColorClassName } from '@renderer/utils/styles/backgroundColor';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

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

type Props = {
  onSelectImage: (image: string) => void;
};

export default function BackgroundImagePicker({ onSelectImage }: Props) {
  const theme = useSelector(selectTheme);

  const onOpenBackgroundPicker = async () => {
    const path = await window.api.selectAndSavePhoto();

    if (path !== null) {
      console.log({ path });
      onSelectImage(path);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-row gap-3">
        {IMAGES.map((image) => {
          return (
            <div
              key={image}
              className="h-30 w-20 rounded-xl overflow-hidden shrink-0 cursor-pointer"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={() => onSelectImage(image)}
            />
          );
        })}
        <div
          className={clsx(
            'h-30 w-20 rounded-xl overflow-hidden shrink-0 p-2 flex justify-center items-center text-center cursor-pointer',
            getBackgroundColorClassName(theme, 400)
          )}
          onClick={onOpenBackgroundPicker}
        >
          <Text size="xsmall" className="text-white">
            Add From Device
          </Text>
        </div>
      </div>
    </div>
  );
}
