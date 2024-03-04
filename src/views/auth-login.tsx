// built-in components
import { useEffect, useState } from 'react';
// 3rd party componets
import { Link, useNavigate, useLocation } from 'react-router-dom';
// custom hooks components
import useAuth from '../hooks/use-authentication';
// custom components
import axios from '../api/axios';
// import request from '../scripts/request';


const LoginView = (): React.JSX.Element => {

  const { setAuthentication } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [isServerResponded, setIsServerResponded] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const [loginError, setLoginError] = useState<string>('');

  useEffect(() => setLoginError(''), [email, pass]);

  const submit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    
    event.preventDefault();

    setIsServerResponded(false);

    axios.post('/login', {email, pass}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then((response: any): void => {
      // console.log(response.data.token);
      setAuthentication({email, pass, token: response.data.token});
      navigate('/dashboard', {replace: true});
    })
    .catch((error) => {
      setLoginError(error.response?.data?.errors?.loginError);
    })
    .finally((): void => {
      setIsServerResponded(true);
    });
  };

  return (
    <main>
      <section id="auth-background">
        <span>{process.env.REACT_APP_NAME}</span>
        {
          isServerResponded
          ? <section id="auth-panel">
              <header>
                <h1>Sign in</h1>
                <p>New user? <Link to="/authentication/registration">Create an account</Link></p>
              </header>
              {loginError && <p style={{color: 'red'}}>{loginError}</p>}
              <form action={process.env.REACT_APP_API_SERVER + "/login"} method="post" onSubmit={submit}>
                <input
                  type="email"
                  name="email"
                  id="email-input"
                  value={email}
                  onChange={(event): void => setEmail(event.target.value)}
                />
                <br />
                <input
                  type="password"
                  name="pass"
                  id="pass-input"
                  value={pass}
                  onChange={(event): void => setPass(event.target.value)}
                />
                <br />
                <button>Sign in</button>
              </form>
            </section>
          : <h1>LOADING</h1>
        }
      </section>
    </main>
  );
}

export default LoginView;