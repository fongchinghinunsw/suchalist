import {getColor} from '@/constants/styles';
import {TaskList} from '@/stores/tasks/types';
import {selectTheme} from '@/stores/theme';
import Icon from '@react-native-vector-icons/ionicons';
import React, {RefObject} from 'react';
import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {DrawerLayoutMethods} from 'react-native-gesture-handler/ReanimatedDrawerLayout';
import {useSelector} from 'react-redux';
import TaskLists from './TaskLists';

export const Content = ({
  drawerRef,
  taskLists,
}: {
  drawerRef: RefObject<DrawerLayoutMethods | null>;
  taskLists: TaskList[];
}) => {
  const theme = useSelector(selectTheme);

  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .onStart(() => drawerRef.current?.openDrawer());

  return (
    <View style={styles.drawerContainer}>
      <TaskLists taskLists={taskLists} />
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
    backgroundColor: '#FFF',
  },
  button: {
    position: 'absolute',
    top: '45%',
    right: -18,
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#FFF',
  },
});
