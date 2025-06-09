import { getImagePath, selectBackgroundImage } from '@renderer/stores/theme';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import Footer from './SideBar/Footer';
import { SideBar } from './SideBar/SideBar';

export default function Layout(): React.JSX.Element {
  const backgroundImageObject = useSelector(selectBackgroundImage);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>();

  // useEffect(() => {
  //   if (!backgroundImageObject) return;

  //   if (backgroundImageObject.type === 'builtin') {
  //     setBackgroundImage(`url(${backgroundImageObject.uri})`);
  //   } else {
  //     const dataUrl = `media://${backgroundImageObject.uri}`;
  //     if (dataUrl) {
  //       console.log({ dataUrl });
  //       setBackgroundImage(dataUrl);
  //     }
  //   }
  // }, [backgroundImageObject]);

  useEffect(() => {
    const path = getImagePath(backgroundImageObject);

    setBackgroundImage(path);

    const img = new Image();
    img.src = path;
  }, [backgroundImageObject]);

  return (
    <main className="flex flex-row w-full min-h-screen pt-11 relative">
      <SideBar />
      <div className="relative w-[75%]">
        <img
          src={backgroundImage}
          className="absolute inset-0 object-cover z-0 pointer-events-none h-full w-full"
        />
        <div className="relative z-10 flex w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </main>
  );
}
