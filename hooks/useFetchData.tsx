import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Models } from 'react-native-appwrite';

const useFetchData = (callback) => {
  const [data, setData] = useState<Models.Document[] & any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (fetchCallback) => {
    setIsLoading(true);
    try {
      const response = await fetchCallback();
      if (response) {
        setData(response);
      }
    } catch (err: any) {
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
