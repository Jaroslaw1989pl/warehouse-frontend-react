// built-in components
import { createContext, useEffect, useState } from 'react';
// 3rd party components
import { useCookies } from 'react-cookie';
import axios from '../api/axios';


const AuthenticationContext = createContext<{authentication?: any, setAuthentication?: any}>({});

export const AuthenticationProvider = ({children}: React.PropsWithChildren<{}>): React.JSX.Element => {

  const [authentication, setAuthentication] = useState<{email?: string, pass?: string, token?: string}|null>(null);
  const [cookies, setCookie] = useCookies(['token'])

  useEffect(() => {
    if (authentication?.token) {
      setCookie('token', authentication.token);//, {sameSite: 'none', httpOnly: true});
      localStorage.removeItem('session');
      localStorage.setItem('session', authentication.token);
    }
    if (authentication?.token === null) {
      localStorage.removeItem('session');
    }
  }, [authentication?.token]);

  return (
    <AuthenticationContext.Provider value={{authentication, setAuthentication}}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;