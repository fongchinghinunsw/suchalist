import Text from '@/components/base/Text';
import { BackgroundImage, selectBackgroundImages, selectTheme } from '@renderer/stores/theme';
import { getBackgroundColorClassName } from '@renderer/utils/styles/backgroundColor';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

type Props = {
  onSelectImage: (image: BackgroundImage) => void;
};

export default function BackgroundImagePicker({ onSelectImage }: Props) {
  const theme = useSelector(selectTheme);
  const backgroundImages = useSelector(selectBackgroundImages);

  const onOpenBackgroundPicker = async () => {
    const path = await window.api.selectAndSavePhoto();

    const image: BackgroundImage = {
      type: 'custom',
      uri: path
    };

    if (path !== null) {
      console.log({ path });
      onSelectImage(image);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-row gap-3">
        {backgroundImages.map((image) => {
          return (
            <div
              key={image.uri}
              className="h-30 w-20 rounded-xl overflow-hidden shrink-0 cursor-pointer"
              style={{
                backgroundImage: `url(${image.uri})`,
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
