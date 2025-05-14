import {JSX, useRef} from 'react';
import {useWindowDimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import ReanimatedDrawerLayout, {
  DrawerLayoutMethods,
  DrawerPosition,
  DrawerType,
} from 'react-native-gesture-handler/ReanimatedDrawerLayout';
import {Content} from './Content';

type Props = {
  children: JSX.Element;
};

export default function HeaderDrawerLayout({children}: Props) {
  const drawerRef = useRef<DrawerLayoutMethods>(null);
  const {width} = useWindowDimensions();

  const horizontalSwipeGesture = Gesture.Pan()
    .onUpdate(e => {
      if (
        Math.abs(e.translationX) > Math.abs(e.translationY) &&
        e.translationX > 20
      ) {
        drawerRef.current?.openDrawer();
      }
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={horizontalSwipeGesture}>
      <ReanimatedDrawerLayout
        ref={drawerRef}
        renderNavigationView={() => <Content drawerRef={drawerRef} />}
        drawerPosition={DrawerPosition.LEFT}
        drawerType={DrawerType.FRONT}
        drawerWidth={width * 0.8}
        edgeWidth={0}>
        {children}
      </ReanimatedDrawerLayout>
    </GestureDetector>
  );
}
