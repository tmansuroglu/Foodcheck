import React from 'react';
import { Row, Col, Typography } from 'antd';
import './index.css';

const Header = () => {
  const { Title } = Typography;
  return (
    <Row align='middle' className='headerRow'>
      <Col span={12} offset={6}>
        <Title className='homePageDescriptionTitle' level={1}>
          FOODCHECK
        </Title>
        <p className='productSummaryText'>
          Foodcheck is a simple diet planning app. It allows you to pick food,
          serving size and amount from its database and makes calorie
          calculation for you. Foodcheck displays daily consumption graphs,
          calories and nutrients per food and diet overview for you to manage
          your diet easily and it is completely free to use!
        </p>
      </Col>
    </Row>
  );
};

export default Header;
