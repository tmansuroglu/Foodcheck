import React, { useState, useEffect } from "react";
import { Col, Card, Row, AutoComplete } from "antd";
import { querySearch } from "../NutritionixAPI";

const EditDiet = props => {
    const [options, setOptions] = useState([
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
    ]);

    const [query, setQuery] = useState("");

    useEffect(() => {
        querySearch(query)
            .then(data => {
                if (data) {
                    setOptions([]);
                    Object.values(data).map((foodObj, index) => {
                        if (index < 5) {
                            setOptions([
                                ...options,
                                { value: foodObj.food_name },
                            ]);
                        }
                    });
                }
            })
            .catch(err => alert(err));
    }, [query]);

    const handleSearch = input => {
        console.log("onSelect", input);
        setQuery(input);
    };

    return (
        <Col xs={24} sm={24} md={12} lg={12} xl={16}>
            <Row align="middle" justify="center">
                <Col>
                    <Card
                        title={
                            <AutoComplete
                                style={{ width: 350 }}
                                options={options}
                                placeholder="Search food here..."
                                onSearch={handleSearch}
                                filterOption={(inputValue, option) =>
                                    option.value
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !==
                                    -1
                                }
                            />
                        }
                        style={{ width: 400 }}
                    ></Card>
                </Col>
            </Row>
        </Col>
    );
};

export default EditDiet;
