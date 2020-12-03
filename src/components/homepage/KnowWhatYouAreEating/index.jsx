import React from 'react';
import { Row, Col, Image, Typography } from 'antd';
import text from '../../../placeholderText';
import mid2 from '../../../images/mid2.png';
import './index.css';

const KnowWhatYouAreEating = () => {
    const { Title } = Typography;
    return (
        <Row align='middle' className='knowWhatYouAreEatingRow'>
            <Col className='knowWhatYouAreEatingCol' lg={12} xs={24}>
                <Image src={mid2} width='90%' />
            </Col>
            <Col lg={12} xs={24} className='knowWhatYouAreEatingCol'>
                <Title className='knowWhatYouAreEatingText' level={1}>
                    KNOW WHAT YOU ARE EATING!
                </Title>
                <p>{text}</p>
            </Col>
        </Row>
    );
};

export default KnowWhatYouAreEating;
