import React from "react";
import { List, Collapse, Button } from "antd";

const { Panel } = Collapse;

const Description = ({ food }) => {
    return (
        <Collapse ghost>
            <Panel header={<Button>Click here to see details</Button>}>
                <List>
                    <List.Item>
                        Serving size : {food.nutrientsConsumed.serving_amount}{" "}
                        {food.nutrientsConsumed.serving_size} (
                        {food.nutrientsConsumed.consumption_in_grams} gr)
                    </List.Item>
                    <List.Item>
                        Calories: {food.nutrientsConsumed.calories} kcal
                    </List.Item>
                    <List.Item>
                        Protein: {food.nutrientsConsumed.protein}
                        gr
                    </List.Item>
                    <List.Item>
                        Total Carbohydrate :{" "}
                        {food.nutrientsConsumed.total_carbohydrate}
                        gr ({food.nutrientsConsumed.sugars}
                        gr sugar and {food.nutrientsConsumed.cholesterol}
                        mg cholesterol)
                    </List.Item>

                    <List.Item>
                        Total Fat: {food.nutrientsConsumed.total_fat}
                        gr ({food.nutrientsConsumed.saturated_fat}
                        gr saturated fat)
                    </List.Item>
                    <List.Item>
                        Sodium : {food.nutrientsConsumed.sodium}
                        mg
                    </List.Item>
                    <List.Item>
                        Potassium : {food.nutrientsConsumed.potassium}
                        mg
                    </List.Item>
                    <List.Item>
                        Fibers : {food.nutrientsConsumed.fibers}
                        mg
                    </List.Item>
                    <List.Item>
                        Phosphorus: {food.nutrientsConsumed.p}
                        mg
                    </List.Item>
                </List>
            </Panel>
        </Collapse>
    );
};

export default Description;
