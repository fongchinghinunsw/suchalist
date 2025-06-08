import { selectBackgroundImage } from '@renderer/stores/theme';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { SideBar } from './SideBar';
import Footer from './SideBar/Footer';

export default function Layout(): React.JSX.Element {
  const backgroundImage = useSelector(selectBackgroundImage);
  console.log({ backgroundImage });

  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
  }, [backgroundImage]);

  return (
    <main
      className="flex flex-row w-full min-h-screen pt-11 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <SideBar />
      <Outlet />
      <Footer />
    </main>
  );
}
