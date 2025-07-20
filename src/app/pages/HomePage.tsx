import { useEffect } from 'react';

const HomePage = () => {
        useEffect(() => {
         document.title = "Mr. Fire's Website";
       }, []);

  return <div>HomePage</div>;
}
export default HomePage;