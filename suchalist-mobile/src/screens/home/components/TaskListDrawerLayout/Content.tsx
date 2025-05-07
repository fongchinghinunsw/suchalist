import {getColor} from '@/constants/styles';
import {selectTheme} from '@/stores/theme';
import Icon from '@react-native-vector-icons/ionicons';
import React, {RefObject} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {DrawerLayoutMethods} from 'react-native-gesture-handler/ReanimatedDrawerLayout';
import {useSelector} from 'react-redux';

export const Content = ({
  drawerRef,
}: {
  drawerRef: RefObject<DrawerLayoutMethods | null>;
}) => {
  const theme = useSelector(selectTheme);

  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .onStart(() => drawerRef.current?.openDrawer());

  return (
    <View style={styles.drawerContainer}>
      <Text>Lorem ipsum</Text>
      <GestureDetector gesture={tapGesture}>
        <View style={styles.button}>
          <Icon name="chevron-forward-outline" color={getColor(theme, 400)} />
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  button: {
    position: 'absolute',
    right: -18,
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#FFF',
  },
});
