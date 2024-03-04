// built-in components
import { useEffect, useState } from 'react';
// 3rd party components
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
// custom components
// import Topbar from '../components/topbar';
import useAxiosPrivate from '../hooks/use-axios-private';
// custom hooks component
import useAuth from '../hooks/use-authentication';


const UserLayout = (): React.JSX.Element => {
  
  const [user, setUser] = useState(null);
  const [isServerResponded, setIsServerResponded] = useState<boolean>(true);

  const { setAuthentication } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    
    let isMounted = true;

    const controller = new AbortController();

    // const getUser = async () => {
      axiosPrivate.get('/user/get'/*, {signal: controller.signal}*/)
      .then((response: any) => {
        console.log('dashboard response');
        /*isMounted && */setUser(response?.data);
      })
      .catch((error: any) => {
        console.log('dashboard error');
        setUser(null);
      });
    // };

    // getUser();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  }, []);

  const logout = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    
    event.preventDefault();

    // setIsServerResponded(false);

    // axios.post('/logout')//, {email, pass}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    // .then((response: any): void => {
    //   // console.log(response.data.token);
      setAuthentication((prev: any) => {
        return {...prev, token: null}
      });
      navigate('/', {replace: true});
    // })
    // .catch((error) => {
    //   console.log(error.response?.data?.errors);
    // })
    // .finally((): void => {
    //   setIsServerResponded(true);
    // });
  }; 

  return (
    <main className="main-layout" style={{backgroundColor: 'lightseagreen'}}>
      <nav id="topbar">
        <div id="topbar-left">
          <span id="topbar-title">{process.env.REACT_APP_NAME}</span>
        </div>
        <div id="topbar-right">
          <form onSubmit={logout}>
            <button>Sign out</button>
          </form>
        </div>
      </nav>
      <Outlet />
    </main>
  );
}

export default UserLayout;