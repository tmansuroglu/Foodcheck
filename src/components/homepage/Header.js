import React from "react";
import { Row, Col, Typography } from "antd";
import text from "../../placeholderText";
import restaurant from "../../images/HomePagebackground.jpg";

const Header = () => {
    const { Title } = Typography;
    return (
        <Row
            align="middle"
            style={{
                backgroundImage: ` linear-gradient(0deg, rgba(2,0,36,0.3) 0%, rgba(240,241,239,0.3) 0%, rgba(0,0,0,0.3) 0%), url(${restaurant})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100vw",
                height: "80vh",
                color: "white",
            }}
        >
            <Col span={12} offset={6}>
                <Title
                    level={1}
                    style={{
                        color: "white",
                        fontSize: "6rem",
                        textAlign: "center",
                        fontFamily: "Arial, Helvetica",
                    }}
                >
                    FOODCHECK
                </Title>
                <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
                    {text}
                </p>
            </Col>
        </Row>
    );
};

export default Header;
