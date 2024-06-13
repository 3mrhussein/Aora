import { Alert } from 'react-native';
import i18n from '../i18n/config';
import * as ImagePicker from 'expo-image-picker';

export const switchLanguage = (lang) => {
  i18n.changeLanguage(lang);
};

export const openPicker = async (
  selectType: 'image' | 'video'
): Promise<ImagePicker.ImagePickerAsset | undefined> => {
  try {
    // Request the media library permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'We need access to your photos/videos to proceed.'
      );
      throw new Error('Access Denied Need Permission From User');
    }

    // Launch the picker based on the selected type
    let result;
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === 'image'
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset: ImagePicker.ImagePickerAsset = result.assets[0]; // Access the first selected asset
      return selectedAsset;
    } else {
      setTimeout(() => {
        Alert.alert('Selection Canceled', 'You did not select any file.');
        throw new Error('Canceled');
      }, 100);
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
