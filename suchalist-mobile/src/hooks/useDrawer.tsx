import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  JSX,
} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type {Props as AddTaskDrawerProps} from '../components/AddTaskForm';

type DrawerComponent<K extends DrawerKey> = React.ComponentType<
  DrawerConfiguration[K]
>;

export type DrawerKey = keyof DrawerConfiguration;

export type CreateDrawerContent<K extends DrawerKey> = (
  options: DrawerConfiguration[K],
) => DrawerComponent<K>;

type DrawerManagerContextType<K extends DrawerKey> = {
  registerDrawer: (key: K, createDrawerContent: CreateDrawerContent<K>) => void;
  showDrawer: (key: K, config: DrawerConfiguration[K]) => void;
  hideDrawer: () => void;
};

type DrawerConfiguration = {
  addTask: AddTaskDrawerProps;
  addSingleTask: AddTaskDrawerProps;
};

const DrawerContext = createContext<DrawerManagerContextType<DrawerKey> | null>(
  null,
);

export const useDrawer = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error('DrawerProvider is missing');
  }
  return ctx;
};

export const DrawerProvider = ({children}: {children: ReactNode}) => {
  const drawerRegistry = useRef(
    new Map<DrawerKey, CreateDrawerContent<DrawerKey>>(),
  );
  const [ActiveDrawerComponent, setActiveDrawerComponent] =
    useState<JSX.Element | null>(null);
  const translateY = useSharedValue(300);

  const registerDrawer = <K extends DrawerKey>(
    key: K,
    createDrawerContent: CreateDrawerContent<K>,
  ) => {
    drawerRegistry.current.set(key, createDrawerContent);
    console.log('register drawer', key);
  };

  const showDrawer = <K extends DrawerKey>(
    key: K,
    config: DrawerConfiguration[K],
  ) => {
    const createDrawerContent = drawerRegistry.current.get(key);

    if (createDrawerContent === undefined) {
      console.warn(`Drawer "${key}" is not registered.`);
      return;
    }

    const DrawerContent = createDrawerContent(config);
    setActiveDrawerComponent(() => <DrawerContent {...config} />);

    translateY.value = withTiming(0, {duration: 250});
  };

  const hideDrawer = () => {
    translateY.value = withTiming(300, {duration: 250});
    setTimeout(() => {
      setActiveDrawerComponent(null);
    }, 250);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  return (
    <DrawerContext.Provider value={{registerDrawer, showDrawer, hideDrawer}}>
      {children}

      {ActiveDrawerComponent && (
        <>
          <Pressable style={StyleSheet.absoluteFill} onPress={hideDrawer}>
            <View style={styles.backdrop} />
          </Pressable>

          <Animated.View style={[styles.drawer, animatedStyle]}>
            {ActiveDrawerComponent}
          </Animated.View>
        </>
      )}
    </DrawerContext.Provider>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});
