// 3rd party components
import { Link, Outlet } from 'react-router-dom';
// custom components
import Topbar from './../components/topbar';


const MainLayout = (): React.JSX.Element => {
  return (
    <main className="main-layout" style={{backgroundColor: 'cornsilk'}}>
      <nav id="topbar">
        <div id="topbar-left">
          <span id="topbar-title">{process.env.REACT_APP_NAME}</span>
        </div>
        <div id="topbar-right">
          <Link to="/authentication/login">
            <button>Sign in</button>
          </Link>
          <Link to="/authentication/registration">
            <button>Sign up</button>
          </Link>
        </div>
      </nav>
      <Outlet />
    </main>
  );
}

export default MainLayout;