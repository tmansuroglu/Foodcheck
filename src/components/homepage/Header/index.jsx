import React from 'react';
import { Row, Col, Typography } from 'antd';
import text from '../../../placeholderText';
import './index.css';

const Header = () => {
  const { Title } = Typography;
  return (
    <Row align='middle' className='headerRow'>
      <Col span={12} offset={6}>
        <Title className='homePageDescriptionTitle' level={1}>
          FOODCHECK
        </Title>
        <p className='productSummaryText'>{text}</p>
      </Col>
    </Row>
  );
};

export default Header;
