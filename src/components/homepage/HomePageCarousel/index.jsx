import React from 'react';
import { Image, Typography } from 'antd';
import Slider from 'react-slick';
import foodDetails from '../../../images/foodDetails.png';
import dailyStats from '../../../images/dailyStats.png';
import dietOverview from '../../../images/dietOverview.png';
import './index.css';

const HomePageCarousel = () => {
  const { Title } = Typography;
  return (
    <Slider
      dots
      infinite
      speed={500}
      className='carousel'
      slidesToShow={3}
      slidesToScroll={3}
      swipeToSlide
      style={{ textAlign: 'center' }}
      autoplay
      autoplaySpeed={6000}
      fade
      pauseOnHover
      adaptiveHeight
      centerMode
    >
      <div>
        <Title className='knowWhatYouAreEatingText' level={1}>
          KNOW WHAT YOU ARE EATING
        </Title>
        <Image src={foodDetails} alt='food details' className='carouselImage' />
      </div>
      <div>
        <Title className='knowWhatYouAreEatingText' level={1}>
          USE GRAPHS TO MONITOR YOUR DAILY INTAKE
        </Title>
        <Image
          src={dailyStats}
          preview={false}
          alt='food details'
          className='carouselImage'
        />
      </div>
      <div>
        <Title className='knowWhatYouAreEatingText' level={1}>
          KEEP TRACK OF ALL MEALS
        </Title>
        <Image
          src={dietOverview}
          preview={false}
          alt='food details'
          className='carouselImage'
        />
      </div>
    </Slider>
  );
};

export default HomePageCarousel;
