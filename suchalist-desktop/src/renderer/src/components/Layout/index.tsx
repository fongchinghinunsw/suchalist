import { default as blurredBgImage } from '@/assets/images/blue-paint-blur.jpg';
import { default as bgImage } from '@/assets/images/blue-paint.jpg';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { SideBar } from './SideBar';
import Footer from './SideBar/Footer';

export default function Layout(): React.JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bgImage;
    img.onload = () => setIsLoaded(true);
  }, []);

  const backgroundImage = isLoaded ? bgImage : blurredBgImage;

  return (
    <main
      className="flex flex-row w-full min-h-screen pt-11 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <SideBar>SideBar</SideBar>
      <Outlet />
      <Footer />
    </main>
  );
}
