import { View, Text, Image, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  router,
  useLocalSearchParams,
  useNavigation,
  usePathname,
} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchPosts } from '@/api/posts';
import useFetchData from '@/hooks/useFetchData';
import FormField from '@/components/FormField/FormField';
import icons from '@/constants/icons';
import EmptyState from '@/components/EmptyState';
import VideoCard from '@/components/VideoCard/VideoCard';

const Search = () => {
  const { query } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(query as string);
  const { data: posts, refetch } = useFetchData(() => searchPosts(searchQuery));
  let searchInput = searchQuery ?? '';
  const handleSearchQueryChange = (e: string) => {
    searchInput = e;
  };

  const handleSearchIconPress = () => {
    setSearchQuery(searchInput);
  };
  useEffect(() => {
    refetch(() => searchPosts(searchQuery));
  }, [searchQuery]);
  return (
    <SafeAreaView className='bg-primary'>
      <FlatList
        className='bg-primary h-full'
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => (
          <>
            <View className='mt-4 px-4 space-y-6 mb-10'>
              <View className='justify-between items-start flex-row mb-6'>
                <View>
                  <Text className=' font-pmedium text-sm text-gray-100'>
                    Search Results
                  </Text>
                  <Text className='text-2xl font-psemibold text-white'>
                    {searchQuery}
                  </Text>
                </View>
              </View>

              <FormField
                value={searchQuery}
                placeholder={'Search for a video topic'}
                icon={icons.search}
                onChangeText={handleSearchQueryChange}
                onIconPress={() => {
                  if (!searchInput) {
                    return Alert.alert(
                      'Missing query',
                      'Please input something to search results across database'
                    );
                  }
                  handleSearchIconPress();
                }}
              />
            </View>
          </>
        )}
        ListEmptyComponent={
          <EmptyState
            title='No Videos Found'
            subtitle='No videos found for this search'
          />
        }
      />
    </SafeAreaView>
  );
};

export default Search;
