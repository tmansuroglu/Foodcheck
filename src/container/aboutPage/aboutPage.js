import React from "react";
import { Typography, Row, Col } from "antd";
import DietPageBackground from "../../images/DietPageBackground.jpg";

const AboutPage = () => {
    const { Title } = Typography;
    const aboutPageStyle = {
        backgroundImage: `linear-gradient(0deg, rgba(2,0,36,0.3) 0%, rgba(9,9,121,0.3) 0%, rgba(240,241,239,0.3) 0%),url(${DietPageBackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        margin: "0",
    };

    const colStyle = {
        background:
            "linear-gradient(0deg, rgba(251,250,255,1) 0%, rgba(246,246,246,0.4514180672268907) 0%, rgba(247,247,247,0.5298494397759104) 0%)",
        marginTop: "5vh",
        marginBottom: "5vh",
        padding: "5vh",
        borderRadius: "10px",
    };
    return (
        <Row style={aboutPageStyle}>
            <Col span={20} offset={2} style={colStyle}>
                <Title level={1} style={{ textAlign: "center" }}>
                    {" "}
                    About
                </Title>
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
                    turpis laoreet maximus a vel dolor. Nullam sem nisi,
                    vestibulum id nisi vel, porta volutpat massa. Praesent
                    tristique rhoncus odio a viverra. Donec nec mollis lacus,
                    convallis placerat sapien. Quisque non felis eleifend,
                    fringilla dolor in, elementum risus. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Curabitur lacinia arcu eu
                    risus vehicula, a iaculis lorem ornare. Aliquam a luctus
                    elit, ac finibus metus. Integer arcu nunc, malesuada quis
                    velit in, finibus blandit metus. Aliquam finibus, elit in
                    semper posuere, diam tortor blandit tellus, in aliquet
                    tortor dolor et dui. Nullam purus lorem, posuere a ornare
                    nec, varius vel ante. Pellentesque molestie nec libero id
                    cursus. Proin dignissim magna eget neque ullamcorper, vitae
                    laoreet massa auctor. Nam dolor lorem, condimentum viverra
                    congue vitae, lobortis at orci. Praesent sed est odio. Sed
                    iaculis posuere nibh in bibendum. Donec sem velit, aliquam
                    aliquet ullamcorper ut, ornare eu turpis. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Cras mauris turpis,
                    laoreet non augue porta, varius porttitor purus. Mauris
                    ornare aliquam mi, nec lacinia dui lacinia a. Aliquam sed
                    tincidunt mi. Pellentesque imperdiet, metus sed luctus
                    consequat, est metus convallis metus, nec luctus purus velit
                    in quam. Quisque condimentum tellus quis elit iaculis
                    consectetur. Vestibulum egestas luctus mi faucibus cursus.
                    Pellentesque sodales metus a leo dictum, eu vulputate sem
                    ultrices. Morbi mollis pulvinar aliquet. Suspendisse
                    lobortis pharetra lorem nec mollis.
                </p>
            </Col>
        </Row>
    );
};

export default AboutPage;

// test
