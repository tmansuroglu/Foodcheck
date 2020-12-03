import React from 'react';
import { Typography, Row, Col } from 'antd';
import './index.css';

const AboutPage = () => {
    const { Title } = Typography;

    return (
        <Row className='aboutPageRow'>
            <Col span={20} offset={2} className='aboutPageCol'>
                <Title level={1}> About</Title>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    venenatis diam in eros eleifend, a tristique ex tempus. Nam
                    at elit odio. Nulla vehicula, neque a venenatis scelerisque,
                    massa ante luctus ante, nec sollicitudin justo velit ut
                    augue. Sed faucibus nunc non bibendum fermentum. Morbi sed
                    lorem vel quam fringilla dictum. Vestibulum vestibulum
                    accumsan mauris, non sollicitudin lacus egestas laoreet.
                    Quisque porta sagittis purus, sed venenatis eros
                    sollicitudin id. Integer non tellus orci. Maecenas vulputate
                    ligula sit amet nunc cursus, nec viverra nibh ornare. Morbi
                    dolor nunc, venenatis vitae eros vel, laoreet egestas
                    ligula. Etiam suscipit lorem eget felis mollis, in auctor
                    magna placerat. Morbi semper libero nulla, vitae euismod
                    augue vulputate id. Maecenas molestie nibh at nulla
                    pharetra, at rhoncus nunc fringilla. Phasellus ac purus in
                    turpis laoreet maximus a vel dolor.
                </p>
            </Col>
        </Row>
    );
};

export default AboutPage;

// test
