import React from "react";
import { Row, Col, Divider, Space } from "antd";

import Header from "./Header";
import KnowWhatYouAreEating from "./KnowWhatYouAreEating";
import CompareFood from "./CompareFood";
import KeepTrack from "./KeepTrack";
import AllToolsYouNeed from "./AllToolsYouNeed";

const Home = () => {
    return (
        <>
            <Header />

            <Row style={{ marginTop: "5vh", marginBottom: "5vh" }}>
                <Col span={20} offset={2}>
                    <Space direction="vertical" align="center">
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
export default Home;
