'use client';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../apollo.config';
import HomePage from './pages/home/page';
import Navbar from './pages/navbar';
import LoginPage from './pages/login/page';
import SignupPage from './pages/register/page';
import StaticPage from './pages/business/page';
//import SignupPage from './pages/register/page';

// import Business from './pages/business';
const Home = () => {
  return (
    <ApolloProvider client={apolloClient}>

    <>       <HomePage />
    <StaticPage />
       {/* <Business/> */}
    </>
    </ApolloProvider>

  )
}

export default Home;