import React, { useState, useEffect } from "react";
import { Col, Card, Row, AutoComplete } from "antd";
import { querySearch } from "../NutritionixAPI";
import { connect } from "react-redux";

const EditDiet = props => {
    const [options, setOptions] = useState([]);

    const [query, setQuery] = useState("");

    const NUM_DESIRED_RESULTS = 5;

    useEffect(() => {
        querySearch(query)
            .then(data => {
                if (data) {
                    setOptions([]);
                    const results = [];
                    const datas = Object.values(data);
                    for (let i = 0; i < data.length; i++) {
                        if (i < NUM_DESIRED_RESULTS) {
                            results.push({ value: datas[i].food_name });
                        }
                    }
                    setOptions(results);
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

// const mapStateToProps = (state)=>{
//     return(

//     )
// }

// const mapDispatchToProps= dispatch =>{
//     return ()
// }
export default EditDiet;
