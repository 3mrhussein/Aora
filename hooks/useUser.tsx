import { useGlobalContext } from '@/context/GlobalProvider';
import React from 'react';

const useUser = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } =
    useGlobalContext();
  return {
    isLoggedIn,
    user,
    setUser,
    setIsLoggedIn,
  };
};

export default useUser;
