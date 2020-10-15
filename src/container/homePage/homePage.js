import React from "react";
import { Carousel, Row, Col } from "antd";
import HomePageBackground from "../../images/HomePagebackground.jpg";

const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    margin: "0",
};

const backgroundStyle = {
    backgroundImage: `url(${HomePageBackground})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    margin: "0",
};
const HomePage = () => {
    return (
        <>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
            <Row style={backgroundStyle}>
                <Col span={12} offset={6}>
                    asdasd
                </Col>
            </Row>
        </>
    );
};

export default HomePage;

// test
