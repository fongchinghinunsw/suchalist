import {StyleSheet, View} from 'react-native';

type Props = {
  color: string;
  size?: number;
  onClick?: () => void;
};

export default function ColorBox({color, size = 24, onClick}: Props) {
  return (
    <View
      style={[styles.box, {width: size, height: size, backgroundColor: color}]}
      onTouchEnd={onClick}
    />
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 4,
  },
});
