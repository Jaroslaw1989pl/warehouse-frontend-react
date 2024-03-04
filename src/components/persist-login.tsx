// built-in components
import { useEffect, useState } from 'react';
// 3rd party components
import { Outlet } from 'react-router-dom';
// custom hooks components
import useAuth from '../hooks/use-authentication';
import useRefreshToken from '../hooks/use-refresh-token';


const PersistLogin = () => {

    const { authentication } = useAuth();
    const refresh = useRefreshToken();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.warn(error);
            } finally {
                setIsLoading(false);
            }
        }

        !authentication?.token ? verifyRefreshToken() : setIsLoading(false);

    }, []);

    return (
        <>
        {
            isLoading
            ? <h1>LOADING</h1>
            : <Outlet />
        }
        </>
    );
};

export default PersistLogin;