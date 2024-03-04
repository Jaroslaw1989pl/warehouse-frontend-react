// built-in components
import { Link } from 'react-router-dom';


const Topbar = () => {
  return (
    <nav id="topbar">
      <div id="topbar-left">
        <span id="topbar-title">{process.env.REACT_APP_NAME}</span>
      </div>
      {
        true
        ? <div id="topbar-right">
            <Link to="/authentication/login">
              <button>Sign in</button>
            </Link>
            <Link to="/authentication/registration">
              <button>Sign up</button>
            </Link>
          </div>
        : <h1>logged in</h1>
      }
    </nav>
  );
}

export default Topbar;