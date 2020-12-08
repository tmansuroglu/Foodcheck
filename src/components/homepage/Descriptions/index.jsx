import React from 'react';
import { Image, Row, Col } from 'antd';
import foodDetails from '../../../images/foodDetails.png';
import dailyStats from '../../../images/dailyStats.png';
import dietOverview from '../../../images/dietOverview.png';
import './index.css';

const Descriptions = () => {
  const sectionArr = [
    {
      imgSrc: foodDetails,
      imgAlt: 'detailed food nutrients',
      title: 'KNOW WHAT YOU ARE EATING',
      description:
        'Foodcheck lets you to pick food, serving size and amount from its huge database.After you pick Foodcheck lists nutrient values for you. Your selections are editable and removable anytime you want!',
      bigColTextOrder: 2,
      bigColImageOrder: 1,
      backgroundColor: '',
    },
    {
      imgSrc: dailyStats,
      imgAlt: 'nutrient graphs',
      title: 'USE GRAPHS TO MONITOR YOUR DAILY INTAKE',
      description:
        'Foodcheck creates graphs to help you make better analysis on your daily consumption. It also keeps a list of daily accumulated nutrient consumption for you.',
      bigColTextOrder: 1,
      bigColImageOrder: 2,
      backgroundColor: '#f2f2f2',
    },
    {
      imgSrc: dietOverview,
      imgAlt: 'Overview of meals',
      title: 'KEEP TRACK OF ALL MEALS',
      description:
        'Foodcheck displays a list of food consumed in all meals. This way you can compare your meals and optimize your consumption.',
      bigColTextOrder: 2,
      bigColImageOrder: 1,
      backgroundColor: '',
    },
  ];

  const content = sectionArr.map(section => (
    <Row style={{ background: section.backgroundColor }}>
      <Col
        xs={{ span: 24, order: 2 }}
        lg={{ span: 12, order: section.bigColImageOrder }}
        className='homePageCol homePageImageSection'
      >
        <Image
          src={section.imgSrc}
          alt={section.imgAlt}
          preview={false}
          className='homePageImage'
        />
      </Col>
      <Col
        xs={{ span: 24, order: 1 }}
        lg={{ span: 12, order: section.bigColTextOrder }}
        className='homePageCol homePageTextSection'
      >
        <h2 className='homePageHeader'>{section.title}</h2>
        <p className='homePageDescription'>{section.description}</p>
      </Col>
    </Row>
  ));
  return <>{content}</>;
};

export default Descriptions;
