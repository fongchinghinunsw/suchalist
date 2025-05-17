import {StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  styles?: ViewStyle;
};

export default function Divider({styles}: Props) {
  return <View style={[internalStyles.divider, styles]} />;
}

const internalStyles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#ccc', // or getColor(theme, 200)
    marginVertical: 8,
  },
});
