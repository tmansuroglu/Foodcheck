import React from "react";
import { Row, Col, Typography, Image } from "antd";
import text from "../../placeholderText";
import left1 from "../../images/left1.png";

const KeepTrack = () => {
    const { Title } = Typography;
    return (
        <Row align="middle" style={{ marginTop: "5vh", marginBottom: "5vh" }}>
            <Col
                xxl={8}
                lg={8}
                xl={8}
                md={8}
                sm={24}
                xs={24}
                style={{
                    marginTop: "5vh",
                    marginBottom: "5vh",
                }}
            >
                <Image src={left1} width="90%" />
            </Col>
            <Col
                xxl={16}
                lg={16}
                xl={16}
                md={16}
                sm={24}
                xs={24}
                style={{
                    marginTop: "5vh",
                    marginBottom: "5vh",
                }}
            >
                <Title level={1} style={{ textAlign: "center" }}>
                    KEEP TRACK OF YOUR DIET!
                </Title>
                <p>{text}</p>
            </Col>
        </Row>
    );
};

export default KeepTrack;
