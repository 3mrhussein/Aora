import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

const useSafeAreaOnScroll = (threshold = 50) => {
  const [isSafeAreaVisible, setIsSafeAreaVisible] =
    useState(true);
  useEffect(() => {}, [isSafeAreaVisible]);
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > threshold) {
      if (isSafeAreaVisible) setIsSafeAreaVisible(false);
    } else {
      if (!isSafeAreaVisible) setIsSafeAreaVisible(true);
    }
  };
  return { isSafeAreaVisible, handleScroll };
};

export default useSafeAreaOnScroll;
