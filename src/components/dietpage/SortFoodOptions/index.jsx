import React from 'react';
import { Select } from 'antd';

const SortOptions = () => {
  const { Option } = Select;

  return [
    <Option value='ascName' key='Asc. Name'>
      Asc. Name
    </Option>,
    <Option value='descName' key='desc name'>
      Desc. Name
    </Option>,
    <Option value='ascCalories' key='asc calories'>
      Asc. Calories
    </Option>,
    <Option value='descCalories' key='desc cal'>
      Desc. Calories
    </Option>,
    <Option value='ascProtein' key='asc protein'>
      Asc. Protein
    </Option>,
    <Option value='descProtein' key='desc protein'>
      Desc. Protein
    </Option>,
    <Option value='ascFat' key='asc fat'>
      Asc. Fat
    </Option>,
    <Option value='descFat' key='desc fat'>
      Desc. Fat
    </Option>,
    <Option value='ascCarbo' key='asc carb'>
      Asc. Carbo
    </Option>,
    <Option value='descCarbo' key='desc carb'>
      Desc. Carbo
    </Option>,
  ];
};

export default SortOptions;
