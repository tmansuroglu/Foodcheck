import React from 'react';
import { Menu } from 'antd';
import './index.css';

// used in src/components/dietpage/CreateMeal/index.jsx
const CreateMealOptions = ({ handleMealCreation }) => {
  return (
    <Menu>
      <Menu.Item onClick={() => handleMealCreation('Pre-Breakfast Snack')}>
        Pre-Breakfast Snack
      </Menu.Item>
      <Menu.Item onClick={() => handleMealCreation('Breakfast')}>
        Breakfast
      </Menu.Item>
      <Menu.Item onClick={() => handleMealCreation('Pre-Lunch Snack')}>
        Pre-Lunch Snack
      </Menu.Item>
      <Menu.Item onClick={() => handleMealCreation('Lunch')}>Lunch</Menu.Item>
      <Menu.Item onClick={() => handleMealCreation('Pre-Dinner Snack')}>
        Pre-Dinner Snack
      </Menu.Item>
      <Menu.Item onClick={() => handleMealCreation('Dinner')}>Dinner</Menu.Item>
      <Menu.Item onClick={() => handleMealCreation('Pre-Sleep Snack')}>
        Pre-Sleep Snack
      </Menu.Item>
    </Menu>
  );
};

// CreateMealOptions.defaultProps = {
//   handleMealCreation: x => x,
// };

// CreateMealOptions.propTypes = {
//   handleMealCreation: propTypes.func,
// };

export default CreateMealOptions;
