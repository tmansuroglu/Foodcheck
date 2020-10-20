import React from "react";
import { Select } from "antd";
const SortOptions = () => {
    const { Option } = Select;

    return [
        <Option value="ascName">Asc. Name</Option>,
        <Option value="descName">Desc. Name</Option>,
        <Option value="ascCalories">Asc. Calories</Option>,
        <Option value="descCalories">Desc. Calories</Option>,
        <Option value="ascProtein">Asc. Protein</Option>,
        <Option value="descProtein">Desc. Protein</Option>,
        <Option value="ascFat">Asc. Fat</Option>,
        <Option value="descFat">Desc. Fat</Option>,
        <Option value="ascCarbo">Asc. Carbo</Option>,
        <Option value="descCarbo">Desc. Carbo</Option>,
    ];
};

export default SortOptions;
