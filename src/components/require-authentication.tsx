// 3rd party components
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// custom hooks components
import useAuth from '../hooks/use-authentication';


const RequireAuthentication = (): React.JSX.Element => {

    const { authentication } = useAuth();
    const location = useLocation();

    return (
        authentication?.token ? <Outlet /> : <Navigate to="/authentication/login" state={{from: location}} replace />
    );
};

export default RequireAuthentication;