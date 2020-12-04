import React from 'react';
import { List, Avatar } from 'antd';
import './index.css';

const ListItem = ({ item }) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={item.photo.thumb} />}
        title={
          <>
            {item.nutrientsConsumed.serving_amount}{' '}
            {item.nutrientsConsumed.serving_size} {item.food_name}{' '}
            {item.nutrientsConsumed.calories} kcal
          </>
        }
      />
    </List.Item>
  );
};

export default ListItem;
