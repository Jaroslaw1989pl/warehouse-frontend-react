// built-in components
import './App.css';
// 3rd party components
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// custom layouts
import AuthenticationLayout from './layouts/authentication-layout';
import MainLayout from './layouts/main-layout';
import UserLayout from './layouts/user-layout';
// custom components
import PersistLogin from './components/persist-login';
import RequireAuthentication from './components/require-authentication';
import HomeView from './views/home';
import LoginView from './views/auth-login';
import RegistrationView from './views/auth-registration';
import NotFound from './views/404';
import UserDashboard from './views/user-dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<HomeView />} />
        </Route>
        {/* AUTHENTICATION ROUTES */}
        <Route path="/authentication" element={<AuthenticationLayout />}>
          <Route path="login" element={<LoginView />} />
          <Route path="registration" element={<RegistrationView />} />
        </Route>
        {/* PROTECTED ROUTES */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuthentication />}>
            <Route path="/" element={<UserLayout />}>
              <Route path="/dashboard" element={<UserDashboard />} />
            </Route>
          </Route>
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
