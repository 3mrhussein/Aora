import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import icons from '@/constants/icons';
import { ResizeMode, Video } from 'expo-av';
import { VideoCardProps } from './VideoCard.types';
const VideoCard: React.FC<VideoCardProps> = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { avatar, username },
  },
}) => {
  const [play, setPlay] = useState(false);
  return (
    <View className='flex-col items-center mb-14  '>
      <View className='flex-row w-full gap-y-3  items-start'>
        <View className='justify-center items-center flex-row flex'>
          <View className=' w-[46px] h-[46px] rounded-lg  border border-secondary-100 justify-center items-center p-0.5'>
            <Image
              source={{ uri: avatar }}
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>
          <View className='flex-1 justify-center ml-3 gap-y-1'>
            <Text
              numberOfLines={1}
              className='text-white font-psemibold text-sm'
            >
              {title}
            </Text>
            <Text
              className='text-xs text-gray-100 font-pregular'
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className='pt-2'>
          <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className='w-full h-60 rounded-xl mt-3'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) setPlay(false);
          }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          activeOpacity={0.7}
          className=' w-full h-60 rounded-xl shadow-sm shadow-gray-700 mt-3 relative justify-center items-center'
        >
          <Image
            source={{ uri: thumbnail }}
            className='w-full h-full rounded-xl'
            resizeMode='cover'
          />
          <Image
            source={icons.play}
            resizeMode='contain'
            className='absolute w-12 h-12'
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
