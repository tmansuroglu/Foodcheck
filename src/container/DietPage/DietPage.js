import React from "react";

//import CreateDiet from "../../components/CreateDiet";
import EditDiet from "../../components/EditDiet";
import DietDetails from "../../components/DietDetails";
import ManageDiet from "../../components/ManageDiet";

import { Row } from "antd";

const DietPage = () => {
    return (
        <Row>
            <ManageDiet />
            <EditDiet />
            <DietDetails />
        </Row>
    );
};

export default DietPage;

// test
