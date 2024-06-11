import { View, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';

const useFetchData = (callback) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (fetchCallback) => {
    setIsLoading(true);
    try {
      const response = await fetchCallback();
      if (response) {
        setData(response);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(callback);
  }, []);

  const refetch = (refetchCallback = callback) => {
    fetchData(refetchCallback);
  };

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    refetch,
  };
};

export default useFetchData;
