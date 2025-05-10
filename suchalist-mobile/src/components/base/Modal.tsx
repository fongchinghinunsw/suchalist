import {StyleSheet, View, ViewStyle} from 'react-native';
import RNModal from 'react-native-modal';
import Text from '../base/Text';
import Button from '../base/Button';

type Props = {
  title: string;
  description: string;
  isVisible: boolean;
  primaryButton: {
    label: string;
    onClick: () => void;
    style?: ViewStyle;
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
    style?: ViewStyle;
  };
  onDismiss: () => void;
};

export default function Modal({
  title,
  description,
  isVisible,
  primaryButton,
  secondaryButton,
  onDismiss,
}: Props) {
  return (
    <RNModal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onDismiss}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text size="large" style={styles.title}>
            {title}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {secondaryButton && (
            <Button
              mode="outlined"
              style={secondaryButton.style}
              onPress={secondaryButton.onClick}>
              {secondaryButton.label}
            </Button>
          )}
          <Button
            mode="contained"
            style={primaryButton.style}
            onPress={primaryButton.onClick}>
            {primaryButton.label}
          </Button>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '30%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },
  textContainer: {
    gap: 20,
    flex: 1,
  },
  title: {
    color: '#000',
    fontWeight: 800,
  },
  description: {
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});
