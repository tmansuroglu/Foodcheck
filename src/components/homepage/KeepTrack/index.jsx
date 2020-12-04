import React from 'react';
import { Row, Col, Typography, Image } from 'antd';
import text from '../../../placeholderText';
import dietOverview from '../../../images/dietOverview.png';
import './index.css';

const KeepTrack = () => {
  const { Title } = Typography;
  return (
    <Row align='middle' className='keepTrackRow'>
      <Col md={8} xs={24} className='keepTrackCol'>
        <Image src={dietOverview} width='90%' />
      </Col>
      <Col md={16} xs={24} className='keepTrackCol'>
        <Title className='keepTrackText' level={1}>
          KEEP TRACK OF YOUR DIET!
        </Title>
        <p>{text}</p>
      </Col>
    </Row>
  );
};

export default KeepTrack;
