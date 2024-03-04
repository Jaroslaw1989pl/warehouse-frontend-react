// built-in components
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// custom components
import request from './../scripts/request';


const RegistrationView = (): React.JSX.Element => {

  const [isServerResponded, setIsServerResponded] = useState<boolean>(true);
  const [isResponseCorrect, setIsResponseCorrect] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [pass2, setPass2] = useState<string>('');

  const [emailError, setEmailError] = useState<string>('');
  const [passError, setPassError] = useState<string>('');
  const [pass2Error, setPass2Error] = useState<string>('');

  useEffect(() => setEmailError(''), [email]);
  useEffect(() => setPassError(''), [pass]);
  useEffect(() => setPass2Error(''), [pass2]);

  /**
   * TODO:
   * - registration form validation
   */
  const submit = (event: React.FormEvent<HTMLFormElement>): void => {

    event.preventDefault();

    setIsServerResponded(false);

    request(event.currentTarget.method, process.env.REACT_APP_API_SERVER + '/user/add', `email=${email}&pass=${pass}&pass2=${pass2}`)
    .then((response: any): void => {
      setIsResponseCorrect(true);
    })
    .catch((error: any): void => {
      setIsResponseCorrect(false);
      setEmailError(error.errors.email);
      setPassError(error.errors.pass);
      setPass2Error(error.errors.pass2);
    })
    .finally((): void => {
      setIsServerResponded(true);
    });
  };

  if (isServerResponded && isResponseCorrect) {
    return (
      <main>
        <section id="auth-background">
          <span>{process.env.REACT_APP_NAME}</span>
          <h1>WELCOME</h1>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section id="auth-background">
        <span>{process.env.REACT_APP_NAME}</span>
        {
          isServerResponded
          ? <section id="auth-panel">
              <header>
                <h1>Create an account</h1>
                <p>Already have an account? <Link to="/authentication/login">Sign in</Link></p>
              </header>
              <form method="post" onSubmit={submit}>
                <input type="email" name="email" id="email-input" value={email} onChange={(event): void => setEmail(event.target.value)} />
                {emailError && <label htmlFor="email-input" style={{color: 'red'}}>{emailError}</label>}
                <br />
                <input type="password" name="pass" id="pass-input" value={pass} onChange={(event): void => setPass(event.target.value)} />
                {passError && <label htmlFor="pass-input" style={{color: 'red'}}>{passError}</label>}
                <br />
                <input type="password" name="pass2" id="pass-2-input" value={pass2} onChange={(event): void => setPass2(event.target.value)} />
                {pass2Error && <label htmlFor="pass2-input" style={{color: 'red'}}>{pass2Error}</label>}
                <br />
                <button>Sign up</button>
              </form>
            </section>
          : <h1>LOADING</h1>
        }
      </section>
    </main>
  );
}

export default RegistrationView;