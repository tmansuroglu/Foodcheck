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
import db from "../firebaseConfig";

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

    const [activeMealContent, setActiveMealContent] = useState();
    const [activeMealName, setActiveMealName] = useState("");

    //serving options for select element
    const [servingOptions, setServingOptions] = useState();

    function onMeasureChange(value) {
        console.log(`measure changed to ${value}`);
        setSelectedFoodMeasure(value);
        setInputToggle(false);
    }

    //the food selected from search bar gets stored in state
    const handleSelectSearchResult = foodName => {
        setSelectedFoodName(foodName);
        console.log("food selected from search bar", foodName);
    };

    // gets food details by its name makes food data available
    useEffect(() => {
        if (selectedFoodName) {
            (async () => {
                console.log("selectedFoodName", selectedFoodName);
                const details = await getDetails(selectedFoodName);
                console.log("selected food details are", details);
                setFoodDetails(details);
            })();
        }
    }, [selectedFoodName]);

    // creates options for serving size
    useEffect(() => {
        if (foodDetails) {
            const measuresArr = foodDetails.alt_measures.map(measureObj => {
                console.log("option created");
                return (
                    <Option value={measureObj.measure}>
                        {measureObj.measure}
                    </Option>
                );
            });

            setServingOptions(measuresArr);
        }
    }, [foodDetails]);

    //if there is an object with food details, maps through its measures property and creates options for measurement selector
    if (foodDetails) {
    }

    //this must be on snapshot  //if this works dont pass meal content with active meal
    useEffect(() => {
        console.log("selected meal is", props.SelectedMeal);

        // if (props.SelectedMeal) {
        //     db.collection("users")
        //         .doc(props.uid)
        //         .onSnapshot(function (doc) {
        //             const dietData = doc.data().diet;
        //        });
        if (props.SelectedMeal) {
            setActiveMealContent(Object.values(props.SelectedMeal)[0]);
            setActiveMealName(Object.keys(props.SelectedMeal)[0]);
        }
    }, [props.SelectedMeal]);

    // make quantity input disabled or not disabled

    const handleAmount = value => {
        console.log("amount changed", value);
        setAmount(value);
    };

    const handleAddFood = () => {
        const copyOfFoodDetails = { ...foodDetails };

        //clears data

        delete copyOfFoodDetails.full_nutrients;
        delete copyOfFoodDetails.brand_name;
        delete copyOfFoodDetails.consumed_at;
        delete copyOfFoodDetails.lat;
        delete copyOfFoodDetails.lang;
        delete copyOfFoodDetails.metadata;
        delete copyOfFoodDetails.is_raw_food;
        delete copyOfFoodDetails.ndb_no;
        delete copyOfFoodDetails.meal_type;
        delete copyOfFoodDetails.nix_brand_id;
        delete copyOfFoodDetails.nix_brand_name;
        delete copyOfFoodDetails.nix_item_id;
        delete copyOfFoodDetails.nix_item_name;
        delete copyOfFoodDetails.source;
        delete copyOfFoodDetails.sub_recipe;
        delete copyOfFoodDetails.tags;
        delete copyOfFoodDetails.upc;
        delete copyOfFoodDetails.lng;

        // alt measures contain all measures. this finds user selected measure from there
        const selectedFoodMeasureDetails = foodDetails.alt_measures.find(
            eachType => eachType.measure === selectedFoodMeasure
        );

        //  finds gram weight per selected serving size
        console.log(
            "selectedFoodMeasureDetails.serving_weight",
            selectedFoodMeasureDetails.serving_weight
        );
        console.log(
            "selectedFoodMeasureDetails.qty",
            selectedFoodMeasureDetails.qty
        );
        const selectedFoodMeasureInGrams =
            selectedFoodMeasureDetails.serving_weight /
            selectedFoodMeasureDetails.qty;

        const amountConsumedInGrams = amount * selectedFoodMeasureInGrams;

        // nutrients in default serving size
        const nutrients = [
            copyOfFoodDetails.nf_calories,
            copyOfFoodDetails.nf_cholesterol,
            copyOfFoodDetails.nf_dietary_fiber,
            copyOfFoodDetails.nf_p,
            copyOfFoodDetails.nf_potassium,
            copyOfFoodDetails.nf_protein,
            copyOfFoodDetails.nf_saturated_fat,
            copyOfFoodDetails.nf_sodium,
            copyOfFoodDetails.nf_sugars,
            copyOfFoodDetails.nf_total_carbohydrate,
            copyOfFoodDetails.nf_total_fat,
        ];

        const nutrientNames = [
            "calories",
            "cholesterol",
            "fibers",
            "p",
            "potassium",
            "protein",
            "saturated_fat",
            "sodium",
            "sugars",
            "total_carbohydrate",
            "total_fat",
        ];

        let nutrientsPerGramArr = [];
        const consumedNutrientValues = nutrients.map(nutrients => {
            const nutrientsPerGram =
                nutrients / copyOfFoodDetails.serving_weight_grams;
            nutrientsPerGramArr.push(nutrientsPerGram);
            return nutrientsPerGram * amountConsumedInGrams;
        });

        const nutrientsConsumed = {
            consumption_in_grams: amountConsumedInGrams,
            serving_size: selectedFoodMeasureDetails.measure,
            serving_amount: amount,
        };

        const nutrientsNamesAndValuesPerGram = {};
        //matches consumed nutrient values and names and puts them into nutrients consumed obj
        for (let i = 0; i < consumedNutrientValues.length; i++) {
            nutrientsConsumed[nutrientNames[i]] = consumedNutrientValues[i];
        }
        copyOfFoodDetails.nutrientsConsumed = nutrientsConsumed;

        //matches nutrient values per gram and names and puts them into nutrientsPergram obj
        for (let i = 0; i < nutrientsPerGramArr.length; i++) {
            nutrientsNamesAndValuesPerGram[nutrientNames[i]] =
                nutrientsPerGramArr[i];
        }
        copyOfFoodDetails.nutrientsPerGram = nutrientsNamesAndValuesPerGram;

        //nutrientNames.forEach(nutrient => delete copyOfFoodDetails[nutrient]);
        for (let i = 0; i < nutrientNames.length; i++) {
            delete copyOfFoodDetails[nutrientNames[i]];
        }
        //clears data
        delete copyOfFoodDetails.nf_calories;
        delete copyOfFoodDetails.nf_cholesterol;
        delete copyOfFoodDetails.nf_dietary_fiber;
        delete copyOfFoodDetails.nf_p;
        delete copyOfFoodDetails.nf_potassium;
        delete copyOfFoodDetails.nf_protein;
        delete copyOfFoodDetails.nf_saturated_fat;
        delete copyOfFoodDetails.nf_sodium;
        delete copyOfFoodDetails.nf_sugars;
        delete copyOfFoodDetails.nf_total_carbohydrate;
        delete copyOfFoodDetails.nf_total_fat;
        delete copyOfFoodDetails.serving_qty;
        delete copyOfFoodDetails.serving_unit;
        delete copyOfFoodDetails.serving_weight_grams;

        props.addFood(activeMealName, copyOfFoodDetails);

        setActiveMealContent([...activeMealContent, copyOfFoodDetails]);
    };

    return (
        <Col xs={24} sm={24} md={12} lg={12} xl={16}>
            <Row justify="center">
                {activeMealName ? (
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
                                    style={{ width: 140 }}
                                    placeholder="serving size"
                                    onChange={onMeasureChange}
                                >
                                    {servingOptions ? servingOptions : ""}
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
        uid: state.firebase.auth.uid,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addFood: (mealName, mealContent) =>
            dispatch(AddFood(mealName, mealContent)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditDiet);
