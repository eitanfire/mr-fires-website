import { useEffect } from 'react';
import Header from '../components/Header';

const HomePage = () => {
  useEffect(() => {
    document.title = "Mr. Fire's Website";
  }, []);

  return (
    <>
      <Header />
      HomePage
    </>
  );
};

export default HomePage;