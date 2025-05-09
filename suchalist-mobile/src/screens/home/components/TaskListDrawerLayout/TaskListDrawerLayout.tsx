import {selectHeaders} from '@/stores/tasks/tasks';
import {JSX, useRef} from 'react';
import {useWindowDimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import ReanimatedDrawerLayout, {
  DrawerLayoutMethods,
  DrawerPosition,
  DrawerType,
} from 'react-native-gesture-handler/ReanimatedDrawerLayout';
import {useSelector} from 'react-redux';
import {Content} from './Content';
import AddEntity from './AddEntity';

type Props = {
  children: JSX.Element;
};

export default function TaskListDrawerLayout({children}: Props) {
  const drawerRef = useRef<DrawerLayoutMethods>(null);

  const headers = useSelector(selectHeaders);

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
        renderNavigationView={() => (
          <>
            <Content drawerRef={drawerRef} headers={headers} />
            <AddEntity />
          </>
        )}
        drawerPosition={DrawerPosition.LEFT}
        drawerType={DrawerType.FRONT}
        drawerWidth={width * 0.8}
        edgeWidth={0}>
        {children}
      </ReanimatedDrawerLayout>
    </GestureDetector>
  );
}
