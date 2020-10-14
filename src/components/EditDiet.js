import React, { useState, useEffect } from "react";
import {
    Col,
    Card,
    Row,
    AutoComplete,
    Select,
    InputNumber,
    Button,
    List,
    Avatar,
} from "antd";
import { querySearch, getDetails } from "../NutritionixAPI";
import { connect } from "react-redux";
import { AddFood } from "../redux/actions/DietActions";
import { PlusOutlined } from "@ant-design/icons";

const EditDiet = props => {
    //stores auto complete data
    const [options, setOptions] = useState([]);

    //stores the words user wants to search
    const [query, setQuery] = useState("");

    //stores selected food from search bar
    const [selectedFoodName, setSelectedFoodName] = useState("");

    const NUM_DESIRED_RESULTS = 5;

    const { Option } = Select;

    useEffect(() => {
        querySearch(query)
            .then(data => {
                setOptions([]);
                const results = [];
                const datas = Object.values(data);
                for (let i = 0; i < data.length; i++) {
                    if (i < NUM_DESIRED_RESULTS) {
                        results.push({ value: datas[i].food_name });
                    }
                }
                setOptions(results);
            })
            .catch(err => err);
    }, [query]);

    const handleSearch = input => {
        console.log("onSelect", input);
        setQuery(input);
    };

    //stores selected measure
    const [selectedFoodMeasure, setSelectedFoodMeasure] = useState({});

    //toogles availability of input
    const [inputToggle, setInputToggle] = useState(true);

    //stores food details
    const [foodDetails, setFoodDetails] = useState();

    //stores selected amount
    const [amount, setAmount] = useState(1);

    // takes it from act
    const [activeMealContent, setActiveMealContent] = useState();
    const [activeMealName, setActiveMealName] = useState("");

    function onMeasureChange(value) {
        console.log(`measure changed to ${value}`);
        setSelectedFoodMeasure(value);
        setInputToggle(false);
    }

    function onSearch(val) {
        console.log("search:", val);
    }

    //the food selected from search bar gets stored in state
    const handleSelectSearchResult = foodName => {
        setSelectedFoodName(foodName);
        console.log("food selected from search bar", foodName);
    };

    // gets food details by its name makes food data available
    useEffect(() => {
        getDetails(selectedFoodName)
            .then(details => {
                console.log("details are", details);
                return setFoodDetails(details);
            })
            .catch(err => err);
    }, [selectedFoodName]);

    //this must be on snapshot
    useEffect(() => {
        console.log("selected meal is", props.SelectedMeal);

        if (props.SelectedMeal) {
            setActiveMealContent(Object.values(props.SelectedMeal)[0]);
            setActiveMealName(Object.keys(props.SelectedMeal)[0]);
        }
    }, [props.SelectedMeal]);

    // make quantity input disabled or not disabled

    let optionsArr = "";
    //if there is an object with food details, maps through its measures property and creates options for measurement selector
    if (foodDetails) {
        optionsArr = foodDetails.alt_measures.map(measureObj => {
            console.log("option created");
            return (
                <Option value={measureObj.measure}>{measureObj.measure}</Option>
            );
        });
    }

    const handleAmount = value => {
        console.log("amount changed", value);
        setAmount(value);
    };

    const handleAddFood = () => {
        console.log("food details are", foodDetails);
        console.log("selected food measure is", selectedFoodMeasure);
        console.log("selected food amount is", amount);
        const copyOfFoodDetails = { ...foodDetails };
        delete copyOfFoodDetails.alt_measures;
        //delete copyOfFoodDetails.full_nutrients;

        const selectedFoodMeasureDetails = foodDetails.alt_measures.find(
            eachType => eachType.measure === selectedFoodMeasure
        );
        copyOfFoodDetails.selectedFoodMeasure = selectedFoodMeasureDetails;
        copyOfFoodDetails.amountCosumed = amount;

        console.log("new copy is", copyOfFoodDetails);
        console.log("old copy is", foodDetails);
        props.addFood(activeMealName, copyOfFoodDetails);
    };

    return (
        <Col xs={24} sm={24} md={12} lg={12} xl={16}>
            <Row justify="center">
                {activeMealContent ? (
                    <Card
                        title={
                            <>
                                <AutoComplete
                                    style={{ width: 190 }}
                                    options={options}
                                    placeholder="Search food here..."
                                    onSearch={handleSearch}
                                    onSelect={foodName =>
                                        handleSelectSearchResult(foodName)
                                    }
                                    filterOption={(inputValue, option) =>
                                        option.value
                                            .toUpperCase()
                                            .indexOf(
                                                inputValue.toUpperCase()
                                            ) !== -1
                                    }
                                />
                                <Select
                                    showSearch
                                    style={{ width: 140 }}
                                    placeholder="serving size"
                                    optionFilterProp="children"
                                    onChange={onMeasureChange}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {optionsArr ? optionsArr : ""}
                                </Select>
                                <InputNumber
                                    min={1}
                                    max={999999}
                                    disabled={inputToggle}
                                    defaultValue={1}
                                    onChange={handleAmount}
                                />
                                <Button
                                    disabled={inputToggle}
                                    onClick={handleAddFood}
                                >
                                    <PlusOutlined />
                                </Button>
                            </>
                        }
                    >
                        {activeMealContent.map(meal => {
                            return (
                                <List itemLayout="horizontal">
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    src={meal.photo.thumb}
                                                />
                                            }
                                            title={<p>{meal.food_name}</p>}
                                        />
                                    </List.Item>
                                </List>
                            );
                        })}
                    </Card>
                ) : (
                    ""
                )}
            </Row>
        </Col>
    );
};

const mapStateToProps = state => {
    return {
        SelectedMeal: state.DietReducer.activeMeal,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addFood: (mealName, mealContent) =>
            dispatch(AddFood(mealName, mealContent)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditDiet);
