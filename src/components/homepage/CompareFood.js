import React from "react";
import { Row, Col, Typography, Image } from "antd";
import text from "../../placeholderText";
import mid1 from "../../images/mid1.png";
const CompareFood = () => {
    const { Title } = Typography;
    return (
        <Row align="middle" style={{ marginTop: "5vh", marginBottom: "5vh" }}>
            <Col
                xxl={12}
                lg={12}
                xl={12}
                md={24}
                sm={24}
                xs={24}
                style={{
                    marginTop: "5vh",
                    marginBottom: "5vh",
                }}
            >
                <Title level={1} style={{ textAlign: "center" }}>
                    COMPARE FOOD!
                </Title>
                <p style={{ paddingRight: "4vw" }}>{text}</p>
            </Col>
            <Col
                xxl={12}
                lg={12}
                xl={12}
                md={24}
                sm={24}
                xs={24}
                style={{
                    marginTop: "5vh",
                    marginBottom: "5vh",
                }}
            >
                <Image src={mid1} width="90%" />
            </Col>
        </Row>
    );
};

export default CompareFood;
