import Icon from '@react-native-vector-icons/ionicons';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';

type Props = {
  drag: SharedValue<number>;
  onDeleteTaskPressed: () => void;
};

export default function RightAction({drag, onDeleteTaskPressed}: Props) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drag.value + styles.deleteAction.width}],
    };
  });

  return (
    <Animated.View style={styleAnimation}>
      <Pressable style={styles.deleteAction} onPress={onDeleteTaskPressed}>
        <Icon name="trash-outline" color="#FFF" size={24} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  deleteAction: {
    width: 50,
    height: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
