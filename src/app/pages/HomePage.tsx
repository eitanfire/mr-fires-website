import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    document.title = "Mr. Fire's Website";
  }, []);

  return (
    <>
      HomePage
    </>
  );
};

export default HomePage;