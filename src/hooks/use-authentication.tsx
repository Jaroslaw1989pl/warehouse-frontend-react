// built-in components
import { useContext } from 'react';
// custom context components
import AuthenticationContext from '../context/authentication-context';


const useAuth = () => useContext(AuthenticationContext);

export default useAuth;