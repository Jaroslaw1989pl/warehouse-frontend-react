// built-in components
import { Link } from 'react-router-dom';


const NotFound = (): React.JSX.Element => {
  return (
    <main>
      <h1>404 - Page not found!</h1>
      <Link to="/">back to home page</Link>
    </main>
  );
}

export default NotFound;