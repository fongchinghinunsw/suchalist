import {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import RNModal from 'react-native-modal';
import Button from '../base/Button';
import Text from '../base/Text';

type Props = {
  title: string;
  content: string | ReactNode;
  isVisible: boolean;
  primaryButton: {
    label: string;
    disabled?: boolean;
    style?: ViewStyle;
    onClick: () => void;
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
  content,
  isVisible,
  primaryButton,
  secondaryButton,
  onDismiss,
}: Props) {
  const Content =
    typeof content === 'string' ? (
      <Text style={styles.content}>{content}</Text>
    ) : (
      content
    );
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
          {Content}
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
            disabled={primaryButton.disabled}
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
  content: {
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});
