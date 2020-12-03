import React from "react";
import { Row, Col, Image, Typography } from "antd";
import text from "../../placeholderText";
import mid2 from "../../images/mid2.png";
const KnowWhatYouAreEating = () => {
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
                <Image src={mid2} width="90%" />
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
                <Title level={1} style={{ textAlign: "center" }}>
                    KNOW WHAT YOU ARE EATING!
                </Title>
                <p>{text}</p>
            </Col>
        </Row>
    );
};

export default KnowWhatYouAreEating;
