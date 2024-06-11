import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

const useCheckSession = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'state',
      (e) => {}
    );
    return unsubscribe;
  }, [navigation]);
};

export default useCheckSession;
