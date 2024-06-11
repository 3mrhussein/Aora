import { getCurrentUser } from '@/api/user';
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const GlobalContext = createContext(null);

export const useGlobalContext = () =>
  useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataUpToDate, setIsDataUpToDate] =
    useState(true);
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
        isDataUpToDate,
        setIsDataUpToDate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
