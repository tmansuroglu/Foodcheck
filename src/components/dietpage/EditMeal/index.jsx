import React, { useState, useEffect } from 'react';
import { Col, Card, Row, List, Avatar, Button, Typography } from 'antd';
import { connect } from 'react-redux';
import Description from '../FoodDescription';
import EditFood from '../EditFood';
import DeleteFood from '../DeleteFood';
import SearchBar from '../SearchBar';
import Sort from '../SortFood';
import './index.css';

const EditMeal = ({ activeMeal }) => {
  const { Title } = Typography;
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
  if (!activeMeal) {
    return null;
  }
  return (
    <>
      <Row justify='center'>
        <Card
          className='editMealCard'
          title={
            <>
              <Title className='mealName' level={3}>
                {activeMealName}
              </Title>
              <Sort />
            </>
          }
        >
          <SearchBar />
          <Row>
            {activeMealContent.map(food => {
              return (
                <Col key={food.food_name} xs={24} className='editMealCol'>
                  <List itemLayout='horizontal'>
                    <List.Item
                      actions={[
                        <Button onClick={() => handleEditButton(food)}>
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
                              {`${food.nutrientsConsumed.serving_amount} ${food.nutrientsConsumed.serving_size} ${food.food_name} is ${food.nutrientsConsumed.calories}kcal`}
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
