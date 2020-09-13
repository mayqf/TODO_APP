import HomePage from "../components/HomePage";
import {parseCookies} from 'nookies';
import {redirectUser} from '../utils/auth'

function Home() {
  
  return (
    <HomePage/>
  );
}

Home.getInitialProps = ctx => {
  const {token} = parseCookies(ctx);
  if (token) {
    redirectUser(ctx, '/account');
  }
}

export default Home;
