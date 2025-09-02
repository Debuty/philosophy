import React from 'react';
import './Home.scss';
import { HeaderBanner } from './components/home-banner/HomeBanner';

const Home: React.FC = () => {
  return (
    <div className="home">
      <HeaderBanner/>
    </div>
  );
};

export default Home;
