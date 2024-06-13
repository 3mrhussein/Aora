import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { getUserPosts, searchPosts } from '@/api/posts';
import useFetchData from '@/hooks/useFetchData';
import icons from '@/constants/icons';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard/VideoCard';
import InfoBox from '@/components/InfoBox/InfoBox';
import { logoutUser } from '@/api/user';
import { router } from 'expo-router';
import { useGlobalContext } from '@/context/Global/GlobalProvider';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data } = useFetchData(() => getUserPosts(user.$id));
  const handleLogout = async () => {
    const session = await logoutUser();
    if (session) {
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/sign-in');
    }
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      className='bg-primary h-full'
      data={data}
      keyExtractor={(item) => item?.$id}
      renderItem={({ item }) => {
        return <VideoCard video={item} />;
      }}
      ListEmptyComponent={
        <EmptyState
          title='No Videos Found'
          subtitle='No videos found for this search'
        />
      }
      ListHeaderComponent={
        <>
          <View className=' w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full items-end mb-10'
              onPress={handleLogout}
            >
              <Image
                source={icons.logout}
                resizeMode='contain'
                className='w-6 h-6'
              />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-lg'
                resizeMode='cover'
              />
            </View>
            <InfoBox
              title={user?.username || null}
              containerStyles='mt-5'
              titleStyles='text-lg'
            />
            <View className='mt-5 flex-row'>
              <InfoBox
                title={data.length || 0}
                subtitle='posts'
                containerStyles='mr-10'
                titleStyles='text-xl'
              />
              <InfoBox
                title={'1.2k'}
                subtitle='Followers'
                titleStyles='text-lg'
              />
            </View>
          </View>
        </>
      }
    />
  );
};

export default Profile;
