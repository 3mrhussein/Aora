import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import icons from '@/constants/icons';
import { ResizeMode, Video } from 'expo-av';
const zoomIn = {
  from: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
  to: { scaleX: 1.1, scaleY: 1.1 },
};

const zoomOut = {
  from: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
  to: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
};
const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className={`mx-4 my-2 ${
        activeItem === item.$id ? 'shadow-sm shadow-black ' : ''
      }`}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && status.didJustFinish) setPlay(false);
          }}
        />
      ) : (
        <TouchableOpacity
          className='relative justify-center items-center'
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40 justify-center items-center'
            resizeMode='cover'
          >
            <Image
              source={icons.play}
              className=' absolute w-12 h-12'
              resizeMode='contain'
            />
          </ImageBackground>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      showsHorizontalScrollIndicator={false}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 90,
      }}
      contentOffset={{ x: 120, y: 0 }}
    />
  );
};

export default Trending;
