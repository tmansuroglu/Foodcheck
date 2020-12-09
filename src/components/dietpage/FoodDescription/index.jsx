import React from 'react';
import { List, Collapse, Button } from 'antd';

const { Panel } = Collapse;

const Description = ({ food }) => {
  const { nutrientsConsumed } = food;
  return (
    <Collapse ghost>
      <Panel header={<Button>Click here to see details</Button>}>
        <List>
          <List.Item>
            Serving size : {nutrientsConsumed.serving_amount}{' '}
            {nutrientsConsumed.serving_size} (
            {nutrientsConsumed.consumption_in_grams} gr)
          </List.Item>
          <List.Item>Calories: {nutrientsConsumed.calories} kcal</List.Item>
          <List.Item>
            Protein: {nutrientsConsumed.protein}
            gr
          </List.Item>
          <List.Item>
            Total Carbohydrate : {nutrientsConsumed.total_carbohydrate}
            gr ({nutrientsConsumed.sugars}
            gr sugar and {nutrientsConsumed.cholesterol}
            mg cholesterol)
          </List.Item>

          <List.Item>
            Total Fat: {nutrientsConsumed.total_fat}
            gr ({nutrientsConsumed.saturated_fat}
            gr saturated fat)
          </List.Item>
          <List.Item>
            Sodium : {nutrientsConsumed.sodium}
            mg
          </List.Item>
          <List.Item>
            Potassium : {nutrientsConsumed.potassium}
            mg
          </List.Item>
          <List.Item>
            Fibers : {nutrientsConsumed.fibers}
            mg
          </List.Item>
          <List.Item>
            Phosphorus: {nutrientsConsumed.p}
            mg
          </List.Item>
        </List>
      </Panel>
    </Collapse>
  );
};

export default Description;
