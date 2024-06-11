import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
export const requestPermissions = async () => {
  const { status } =
    await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Permission Denied',
      'Allow Aora to access your photos to upload images.'
    );
  }
};

export const checkPermissions = async () => {
  const { status } =
    await MediaLibrary.getPermissionsAsync();
  if (status !== 'granted') {
    await requestPermissions();
  }
};
