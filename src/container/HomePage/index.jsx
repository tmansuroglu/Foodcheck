import React from 'react';
import Header from '../../components/homepage/Header';
import HomePageCarousel from '../../components/homepage/HomePageCarousel';
import './index.css';

const HomePage = () => {
  return (
    <div className='homePage'>
      <Header />
      <HomePageCarousel />
    </div>
  );
};
export default HomePage;
