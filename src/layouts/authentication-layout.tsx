// 3rd party components
import { Outlet } from 'react-router-dom';


const AuthenticationLayout = (): React.JSX.Element => {
  return (
    <main className="authentication-layout" style={{backgroundColor: 'cornflowerblue'}}>
      <Outlet />
    </main>
  );
}

export default AuthenticationLayout;