import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FormField from '@/components/FormField/FormField';
import { ResizeMode, Video } from 'expo-av';
import icons from '@/constants/icons';
import CustomButton from '@/components/CustomButton/CustomButton';
import { router } from 'expo-router';
import useUser from '@/hooks/useUser';
import { createVideo } from '@/api/posts';
import { checkPermissions } from '@/helpers/permissions';
import * as ImagePicker from 'expo-image-picker';
const Create = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useUser();
  const [form, setForm] = useState<React.SetStateAction<any>>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  const openPicker = async (selectType) => {
    try {
      // Request the media library permission
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'We need access to your photos/videos to proceed.'
        );
        return;
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
        const selectedAsset = result.assets[0]; // Access the first selected asset

        if (selectType === 'image') {
          setForm((prevForm) => ({
            ...prevForm,
            thumbnail: selectedAsset,
          }));
        } else if (selectType === 'video') {
          setForm((prevForm) => ({
            ...prevForm,
            video: selectedAsset,
          }));
        }
      } else {
        setTimeout(() => {
          Alert.alert('Selection Canceled', 'You did not select any file.');
        }, 100);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while selecting the file. Please try again.'
      );
      console.error(error);
    }
  };

  const submit = async () => {
    const { $id } = user;

    if (!form.prompt || !form.title || !form.thumbnail || !form.video)
      return Alert.alert('Please fill in all the fields');
    setUploading(true);
    try {
      await createVideo({ ...form, userId: $id });

      Alert.alert('Success', 'Post uploaded successfuly');
      router.push('/home');
    } catch (err: any) {
      console.log(err);
      Alert.alert('Error', err.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      });
      setUploading(false);
    }
  };
  return (
    <ScrollView className='bg-primary px-4'>
      <SafeAreaView />
      <Text className='mt-6 text-2xl text-white font-psemibold'>
        Upload Video
      </Text>
      <FormField
        title={'Video Title'}
        value={form.title}
        onChangeText={(e) => setForm({ ...form, title: e })}
        placeholder={'Give your video a catch title ....'}
        otherStyles={'mt-10'}
      />
      <View className='mt-7 space-y-2'>
        <Text className='text-base text-gray-100 font-pmedium'>
          Upload Video
        </Text>
        <TouchableOpacity onPress={() => openPicker('video')}>
          {form.video ? (
            <Video
              source={{ uri: form.video.uri }}
              className='w-full h-64 rounded-2xl '
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
            />
          ) : (
            <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
              <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                <Image
                  source={icons.upload}
                  resizeMode='contain'
                  className=' w-1/2 h-1/2'
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View className='mt-7 space-y-2'>
        <Text className='text-base text-gray-100 font-pmedium'>
          Thumbnail Image
        </Text>
        <TouchableOpacity onPress={() => openPicker('image')}>
          {form.thumbnail ? (
            <Image
              source={{ uri: form.thumbnail.uri }}
              className='w-full h-64 rounded-2xl'
              resizeMode='cover'
            />
          ) : (
            <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 space-x-2 flex-row'>
              <Image
                source={icons.upload}
                resizeMode='contain'
                className=' w-5 h-5'
              />
              <Text className='text-sm text-gray-100 font-pmedium'>
                Choose a file
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <FormField
        title={'Ai Prompt'}
        value={form.prompt}
        onChangeText={(e) => setForm({ ...form, prompt: e })}
        placeholder={'The prompt you used to create this video'}
        otherStyles={'mt-7'}
      />
      <CustomButton
        title={'Submit & Publish'}
        onPress={submit}
        containerStyles={'mt-7 '}
        isLoading={uploading}
      />
    </ScrollView>
  );
};

export default Create;
