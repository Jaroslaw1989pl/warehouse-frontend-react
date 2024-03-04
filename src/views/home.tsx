// custom components
import Topbar from '../components/topbar';


const HomeView = (): React.JSX.Element => {
  return (
    <h1>{process.env.REACT_APP_NAME}</h1>
  );
}

export default HomeView;