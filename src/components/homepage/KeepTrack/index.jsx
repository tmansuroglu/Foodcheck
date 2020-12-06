import React from 'react';
import { Row, Col, Typography, Image } from 'antd';
import text from '../../../placeholderText';
import dietOverview from '../../../images/dietOverview.png';
import './index.css';

const KeepTrack = () => {
  const { Title } = Typography;
  return (
    <Row align='middle' className='keepTrackRow'>
      <Col
        xl={{ span: 12, order: 1 }}
        xs={{ span: 24, order: 2 }}
        className='homePageContextCol'
      >
        <Image
          src={dietOverview}
          width='70%'
          preview={false}
          className='homePageImage'
          alt='keep track'
        />
      </Col>
      <Col
        xl={{ span: 12, order: 2 }}
        xs={{ span: 24, order: 1 }}
        className='homePageContextCol'
      >
        <Title className='keepTrackText' level={1}>
          KEEP TRACK OF YOUR DIET!
        </Title>
        <p>{text}</p>
      </Col>
    </Row>
  );
};

export default KeepTrack;
