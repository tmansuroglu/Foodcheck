import React from 'react';
import Header from '../../components/homepage/Header';
import Descriptions from '../../components/homepage/Descriptions';
import './index.css';

const HomePage = () => {
  return (
    <div className='homePage'>
      <Header />
      <Descriptions />
    </div>
  );
};
export default HomePage;
