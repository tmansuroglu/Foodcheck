import React from 'react';
import { Row, Col, Divider, Space } from 'antd';

import Header from '../../components/homepage/Header';
import KnowWhatYouAreEating from '../../components/homepage/KnowWhatYouAreEating';
import CompareFood from '../../components/homepage/CompareFood';
import KeepTrack from '../../components/homepage/KeepTrack';
import AllToolsYouNeed from '../../components/homepage/AllToolsYouNeed';

const HomePage = () => {
    return (
        <>
            <Header />

            <Row style={{ marginTop: '5vh', marginBottom: '5vh' }}>
                <Col span={20} offset={2}>
                    <Space direction='vertical' align='center'>
                        <KnowWhatYouAreEating />
                        <Divider />
                        <CompareFood />
                        <Divider />
                        <KeepTrack />
                        <Divider />
                        <AllToolsYouNeed />
                    </Space>
                </Col>
            </Row>
        </>
    );
};
export default HomePage;
