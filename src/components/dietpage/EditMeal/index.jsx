import React, { useState, useEffect } from 'react';
import { Col, Card, Row, List, Avatar, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Description from '../FoodDescription';
import EditFood from '../EditFood';
import DeleteFood from '../DeleteFood';
import SearchBar from '../SearchBar';
import Sort from '../SortFood';
import './index.css';

const EditMeal = ({ activeMeal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTarget, setEditTarget] = useState();
  const [activeMealName, setActiveMealName] = useState('');
  const [activeMealContent, setActiveMealContent] = useState([]);

  useEffect(() => {
    if (activeMeal) {
      setActiveMealName(Object.keys(activeMeal)[0]);
      setActiveMealContent(Object.values(activeMeal)[0]);
    }
  }, [activeMeal]);

  const handleEditButton = food => {
    setIsEditing(!isEditing);
    setEditTarget(food);
  };

  return (
    <>
      <Row justify='center'>
        {activeMealName && activeMealContent ? (
          <>
            <Card
              className='editMealCard'
              title={
                <>
                  <SearchBar />
                  <Sort />
                </>
              }
            >
              <Row>
                {activeMealContent.map((food, index) => {
                  return (
                    <Col key={index} xs={24} className='editMealCol'>
                      <List itemLayout='horizontal'>
                        <List.Item
                          actions={[
                            <Button onClick={e => handleEditButton(food)}>
                              edit
                            </Button>,
                            <DeleteFood food={food} />,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={food.photo.thumb} />}
                            title={
                              isEditing ? (
                                <EditFood
                                  food={food}
                                  isEditing={isEditing}
                                  setIsEditing={setIsEditing}
                                  editTarget={editTarget}
                                />
                              ) : (
                                <>
                                  {food.nutrientsConsumed.serving_amount}{' '}
                                  {food.nutrientsConsumed.serving_size}{' '}
                                  {food.food_name} <CaretRightOutlined />{' '}
                                  {food.nutrientsConsumed.calories} kcal
                                </>
                              )
                            }
                            description={<Description food={food} />}
                          />
                        </List.Item>
                      </List>
                    </Col>
                  );
                })}
              </Row>
            </Card>
          </>
        ) : (
          ''
        )}
      </Row>
    </>
  );
};

const mapStateToProps = state => {
  return {
    activeMeal: state.DietReducer.activeMeal,
  };
};

export default connect(mapStateToProps)(EditMeal);