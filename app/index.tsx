import React from 'react';
import { Link, Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import images from '../constants/images';
import CustomButton from '@/components/CustomButton/CustomButton';
import { useGlobalContext } from '@/context/Global/GlobalProvider';
import { useEffect } from 'react';
import { requestPermissions } from '@/helpers/permissions';
export default function Index() {
  const { isLoggedIn, isLoading } = useGlobalContext();

  useEffect(() => {
    requestPermissions();
  }, []);

  return isLoggedIn && !isLoading ? (
    <Redirect href={'/home'} />
  ) : (
    //using safe area view to avoid notching collision
    <View className='w-full justify-center items-center h-full px-4'>
      <Image
        source={images.logo}
        className='w-[130px] h-[84px]'
        resizeMode='contain'
      />
      <Image
        source={images.cards}
        className='max-w-[380px] w-full h-[300px]'
        resizeMode='contain'
      />
      <View className='relative mt-5 '>
        <Text className='text-3xl text-white font-bold text-center'>
          Discover Endless Possibilites with{' '}
          <Text className='text-secondary-200'>Aora </Text>
        </Text>
        <Image
          source={images.path}
          className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
          resizeMode='contain'
        />
      </View>
      <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
        Where creativity meets innovation: embark in a journey of limitless
        exploration with Aora
      </Text>
      <CustomButton
        title='Continue with Email'
        onPress={() => {
          router.push('/sign-in');
        }}
        containerStyles='w-full mt-7'
        isLoading={false}
        textStyles={''}
      />
      <StatusBar backgroundColor='#161622' style='light' />
    </View>
  );
}
