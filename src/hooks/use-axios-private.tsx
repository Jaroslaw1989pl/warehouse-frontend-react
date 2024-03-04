// built-inn components
import { useEffect } from 'react';
// custom components
import axios, { axiosPrivate } from '../api/axios';
import useRefreshToken from './use-refresh-token';
import useAuth from './use-authentication';


const useAxiosPrivate = () => {
    
  const refresh = useRefreshToken();
  const { authentication, setAuthentication } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async config => {
        const controller = new AbortController();
        const cfg = {
          ...config,
          signal: controller.signal,
        };

        try {
          const token = await refresh();
          cfg.headers['Authorization'] = `Bearer ${token}`;
          console.log('refresh response');
        } catch (error) {
          controller.abort();
          console.log('refresh error');
          setAuthentication((prev: any) => {
            return {...prev, token: null}
          });
        }

        // if (!config.headers['Authorization']) {
        //   config.headers['Authorization'] = `Bearer ${authentication?.token}`;
        // }
        return cfg;
      },
      error => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        // console.log(error);
        // const previousRequest = error?.config;
        // if (error?.response?.status === 403 && !previousRequest?.sent) {
        //   previousRequest.sent = true;
        //   const newToken = await refresh();
        //   previousRequest.headers['Authorization'] = `Bearer ${newToken}`;
          
        //   return axiosPrivate(previousRequest);
        // }
        return Promise.reject(error)
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };

  }, [authentication, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;