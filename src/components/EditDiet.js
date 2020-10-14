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
    Typography,
    Modal,
    Collapse,
} from "antd";
import { querySearch, getDetails } from "../NutritionixAPI";
import { connect } from "react-redux";
import { AddFood } from "../redux/actions/DietActions";
import { PlusOutlined } from "@ant-design/icons";
import db from "../firebaseConfig";
import { SetMeal } from "../redux/actions/DietActions";

const { Title, Text } = Typography;

const { Panel } = Collapse;

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
        console.log("selected meal is", props.selectedMeal);
        if (props.selectedMeal) {
            setActiveMealContent(Object.values(props.selectedMeal)[0]);
            setActiveMealName(Object.keys(props.selectedMeal)[0]);
        }
    }, [props.selectedMeal]);

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

        // deletes nutrientNames arr elemets. "nf" section is not included but for some reason it works ?
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

    const [modalVisibility, setModalVisibility] = useState(false);

    const [deletionTarget, setDeletionTarget] = useState();
    const handleDelete = food => {
        setModalVisibility(true);
        setDeletionTarget(food);
    };

    const handleFoodDeletion = () => {
        console.log("deletionTarget", deletionTarget);
        console.log("active meal name is", activeMealName);
        console.log("active meal content is", activeMealContent);
        const targetFood = activeMealContent.find(
            food => food.food_name === deletionTarget.food_name
        );

        console.log("targetFood", targetFood);

        const reducer = (acc, cur) => {
            if (cur.food_name !== targetFood.food_name) {
                acc.push(cur);
            }
            return acc;
        };
        const fixedMealContent = activeMealContent.reduce(reducer, []);
        console.log("fixedMealContent", fixedMealContent);
        props.setMeal(activeMealName, fixedMealContent);
        setActiveMealContent(fixedMealContent);
        setModalVisibility(false);
    };
    return (
        <Col xs={24} sm={24} md={12} lg={12} xl={16}>
            <Row justify="center">
                {activeMealName ? (
                    <Card
                        title={
                            <>
                                <Title
                                    style={{ textAlign: "center" }}
                                    level={3}
                                >
                                    {activeMealName}
                                </Title>

                                <AutoComplete
                                    style={{ width: 190 }}
                                    options={options}
                                    placeholder="Add food here..."
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
                        <Modal
                            title="Are you sure?"
                            style={{ top: 20 }}
                            visible={modalVisibility}
                            onOk={e => handleFoodDeletion()}
                            onCancel={() => setModalVisibility(false)}
                        >
                            <p>Deleted foods can't be recovered!</p>
                        </Modal>
                        {activeMealContent.map(food => {
                            return (
                                <List itemLayout="horizontal">
                                    <List.Item
                                        actions={[
                                            <a>edit</a>,
                                            <a
                                                onClick={e =>
                                                    handleDelete(food)
                                                }
                                            >
                                                delete
                                            </a>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    src={food.photo.thumb}
                                                />
                                            }
                                            title={
                                                <p>
                                                    {
                                                        food.nutrientsConsumed
                                                            .serving_amount
                                                    }{" "}
                                                    {
                                                        food.nutrientsConsumed
                                                            .serving_size
                                                    }{" "}
                                                    {food.food_name}
                                                </p>
                                            }
                                            description={
                                                <Collapse ghost>
                                                    <Panel
                                                        header={
                                                            <a>
                                                                Click here to
                                                                see details
                                                            </a>
                                                        }
                                                    >
                                                        <List>
                                                            <List.Item>
                                                                Serving size :{" "}
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .serving_amount
                                                                }{" "}
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .serving_size
                                                                }{" "}
                                                                (
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .consumption_in_grams
                                                                }{" "}
                                                                gr)
                                                            </List.Item>
                                                            <List.Item>
                                                                Calories:{" "}
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .calories
                                                                }{" "}
                                                                kcal
                                                            </List.Item>
                                                            <List.Item>
                                                                Protein:{" "}
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .protein
                                                                }
                                                                gr
                                                            </List.Item>
                                                            <List.Item>
                                                                Total
                                                                Carbohydrate :{" "}
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .total_carbohydrate
                                                                }
                                                                gr (
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .sugars
                                                                }
                                                                gr sugar and{" "}
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .cholesterol
                                                                }
                                                                mg cholesterol)
                                                            </List.Item>

                                                            <List.Item>
                                                                Total Fat:{" "}
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .total_fat
                                                                }
                                                                gr (
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .saturated_fat
                                                                }
                                                                gr saturated
                                                                fat)
                                                            </List.Item>
                                                            <List.Item>
                                                                Sodium :{" "}
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .sodium
                                                                }
                                                                mg
                                                            </List.Item>
                                                            <List.Item>
                                                                Potassium :{" "}
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .potassium
                                                                }
                                                                mg
                                                            </List.Item>
                                                            <List.Item>
                                                                Fibers :{" "}
                                                                {
                                                                    food
                                                                        .nutrientsConsumed
                                                                        .fibers
                                                                }
                                                                mg
                                                            </List.Item>
                                                        </List>
                                                    </Panel>
                                                </Collapse>
                                            }
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
        selectedMeal: state.DietReducer.activeMeal,
        uid: state.firebase.auth.uid,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addFood: (mealName, mealContent) =>
            dispatch(AddFood(mealName, mealContent)),
        setMeal: (mealName, mealData) => dispatch(SetMeal(mealName, mealData)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditDiet);
