import Button from '@/components/base/Button';
import {isAppOutdated} from '@/services/suchalist-service';
import React, {useEffect, useState} from 'react';
import {Linking, Platform, StyleSheet, Text, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';

export default function ForceAppUpdateModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const checkIsAppOutdated = async () => {
      const isOutdated = await isAppOutdated();
      setIsModalVisible(isOutdated);
    };

    checkIsAppOutdated();
  });
  const updateUrl =
    Platform.OS === 'ios'
      ? 'https://apps.apple.com/app/<YOUR_APPLE_ID>' // Replace with your App Store URL
      : 'https://play.google.com/store/apps/details?id=<YOUR_PACKAGE_NAME>'; // Replace with your Play Store URL

  const onUpdatePress = () => {
    Linking.openURL(updateUrl);
  };

  return (
    <Portal>
      <Modal
        visible={isModalVisible}
        dismissable={false}
        contentContainerStyle={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.title}>🚨 Update Required</Text>
          <Text style={styles.text}>
            This version of the app is no longer supported.{'\n'}
            Please update to continue using the app.
          </Text>

          <Button mode="contained" onPress={onUpdatePress}>
            Update Now
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: '30%',
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#444',
  },
});
