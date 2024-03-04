// built-in components
import { useEffect, useState } from 'react';
// custom components
import useAxiosPrivate from '../hooks/use-axios-private';
// import axios from '../api/axios';
// import request from '../scripts/request';
// import useRefreshToken from '../hooks/use-refresh-token';


const UserDashboard = (): React.JSX.Element => {

  // const [user, setUser] = useState();

  // const axiosPrivate = useAxiosPrivate();

  // useEffect(() => {
    
  //   let isMounted = true;

  //   const controller = new AbortController();

  //   const getUser = async () => {
  //     try {
  //       let response = await axiosPrivate.get('/user/get'/*, {signal: controller.signal}*/);
  //       console.log('dashboard response');
  //       // isMounted && setUser(response?.data);
  //     } catch (error) {
  //       console.log('dashboard error');
  //     }
  //   };

  //   // getUser();

  // //   return () => {
  // //     isMounted = false;
  // //     controller.abort();
  // //   };
  // }, []);

  return (
    <>
      <h1>User dashboard</h1>
      {/* <button onClick={async () => await getUser()}>refresh</button> */}
    </>
  );
};

export default UserDashboard