import React from "react";
import EditMeal from "../../components/DietPage/EditDiet/EditMeal";
import ManageDiet from "../../components/DietPage/DietOverview/DietOverview";
import DietPageBackground from "../../images/DietPageBackground.jpg";
import { Row } from "antd";
import DietDetails from "../../components/DietPage/DietDetails/DietDetails";

const editPageStyle = {
    backgroundImage: `linear-gradient(0deg, rgba(2,0,36,0.3) 0%, rgba(9,9,121,0.3) 0%, rgba(240,241,239,0.3) 0%),url(${DietPageBackground})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: "100vh",
    margin: "0",
};
const DietPage = () => {
    return (
        <Row style={editPageStyle}>
            <ManageDiet />
            <EditMeal />
            <DietDetails />
        </Row>
    );
};

export default DietPage;

// test
