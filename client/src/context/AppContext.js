import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { httpService } from '../service/httpService';
import { LocalStorageService } from '../service/localStorageService';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSetUser = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
  };

  const autoLogin = useCallback(async () => {
    const token = LocalStorageService.get('token');
    if (!token) {
      return;
    }
    try {
      const { data } = await httpService.post('/auto-login', { token });
      const { user } = data.data;
      httpService.interceptors.request.use(
        (request) => {
          request.headers['Authorization'] = `Bearer ${token}`;
          return request;
        },
        (error) => Promise.reject(error)
      );
      onSetUser(user);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
      setIsLoggedIn(true);
    } else {
      autoLogin();
    }
  }, []);

  useEffect(() => {
    const authorizationInterceptor = httpService.interceptors.request.use(
      (request) => {
        request.headers['Authorization'] =
          isLoggedIn && LocalStorageService.get('token')
            ? `Bearer ${LocalStorageService.get('token')}`
            : undefined;
        return request;
      }
    );

    return () => {
      httpService.interceptors.request.eject(authorizationInterceptor);
    };
  }, [isLoggedIn]);

  const value = {
    user,
    isLoggedIn,
    setUser: onSetUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
