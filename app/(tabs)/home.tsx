import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import { useGlobalContext } from '@/context/Global/GlobalProvider';
import FormField from '@/components/FormField/FormField';
import icons from '@/constants/icons';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { getAllPosts, getLatestPosts } from '@/api/posts';
import useFetchData from '@/hooks/useFetchData';
import VideoCard from '@/components/VideoCard/VideoCard';
import { router, usePathname } from 'expo-router';

const Home = () => {
  const pathname = usePathname();
  const { user, isDataUpToDate, setIsDataUpToDate } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  let searchQuery = '';
  const { data: posts, refetch } = useFetchData(getAllPosts);
  const { data: latestPosts, refetch: refetchLatestPosts } =
    useFetchData(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllPosts;
    setRefreshing(false);
  };
  const fetchAllPosts = async () => {
    await refetch();
    await refetchLatestPosts();
  };
  useEffect(() => {
    if (!isDataUpToDate) {
      fetchAllPosts();
      setIsDataUpToDate(true);
    }
  }, [refetch]);
  return (
    <SafeAreaView className='bg-primary'>
      <View className='  min-h-full bg-primary '>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => {
            return <VideoCard video={item} />;
          }}
          ListHeaderComponent={() => (
            <>
              <View className='my-6  space-y-6'>
                <View className='justify-between items-start flex-row mb-6'>
                  <View>
                    <Text className=' font-pmedium text-sm text-gray-100'>
                      Welcome Back
                    </Text>
                    <Text className='text-2xl font-psemibold text-white'>
                      {user?.username}
                    </Text>
                  </View>
                  <View className='mt-1.5'>
                    <Image
                      resizeMode='contain'
                      className='w-9 h-10'
                      source={images.logoSmall}
                    />
                  </View>
                </View>
                <FormField
                  placeholder={'Search for a video topic'}
                  icon={icons.search}
                  onChangeText={(e) => (searchQuery = e)}
                  onIconPress={() => {
                    if (!searchQuery) {
                      return Alert.alert(
                        'Missing query',
                        'Please input something to search results across database'
                      );
                    }
                    if (pathname.startsWith('/search'))
                      router.setParams({ searchQuery });
                    else router.push(`/search/${searchQuery}`);
                  }}
                />
                <View className='w-full my-4'>
                  <Text className='text-gray-100 text-lg font-pregular'>
                    Latest Videos
                  </Text>
                  <Trending posts={latestPosts} />
                </View>
              </View>
            </>
          )}
          ListEmptyComponent={
            <SafeAreaView>
              <EmptyState
                title='No Videos Found'
                subtitle='Be the first one to upload a video'
              />
            </SafeAreaView>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
