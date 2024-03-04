// 3rd party components
import axios from '../api/axios';
// import { useCookies } from 'react-cookie'
// custom hooks components
import useAuth from './use-authentication';


const useRefreshToken = () => {

  const { authentication, setAuthentication } = useAuth();
  // const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])

  const refresh = async () => {

    const token = localStorage.getItem('session');

    if (token) {
      const response = await axios.get('/refresh', {
        // sekcja headers została dodana w zastępstwie requestu z cookies
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token
        },
        withCredentials: true
      });
      console.log('useRefreshToken');
      console.log(response.data.token);
      // setCookie('refresh_token', response.data.token, {sameSite: 'none', secure: true, httpOnly: true});
      setAuthentication((prev: any) => {
        // console.log(prev);
        // console.log(response.data);
        return {...prev, token: response.data.token};
      });
      return response.data.token;
    }
  };

  return refresh;
};

export default useRefreshToken;