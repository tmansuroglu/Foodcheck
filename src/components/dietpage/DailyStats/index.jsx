import React from 'react';
import { List } from 'antd';
import './index.css';

const DailyStats = ({ nutrientsConsumed }) => {
  const data = [
    `Fat: ${nutrientsConsumed.total_fat} gr`,
    `Carbohydrate : ${nutrientsConsumed.total_carbohydrate} gr`,
    `Protein: ${nutrientsConsumed.protein} gr`,
    `Sugar: ${nutrientsConsumed.sugars} gr`,
    `Sodium: ${nutrientsConsumed.sodium} mg`,
    `Potassium: ${nutrientsConsumed.potassium} mg`,
    `Cholesterol: ${nutrientsConsumed.cholesterol} mg`,
    `Fibers: ${nutrientsConsumed.fibers} gr`,
  ];
  return (
    <List
      className='dailyStatsList'
      size='small'
      dataSource={data}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
  );
};

export default DailyStats;
