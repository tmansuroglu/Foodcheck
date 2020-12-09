import React, { useState, useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Collapse, List } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import db from '../../../firebaseConfig';
import order from '../mealOrder';
import DeleteMeal from '../DeleteMeal';
import MealCreator from '../CreateMeal';
import ListItem from '../MealItem';
import { activeMeal as reduxActiveMeal } from '../../../redux/actions/DietActions';
import './index.css';

const ManageDiet = ({ userId, activeMeal, setActiveMeal, meals }) => {
  const { Panel } = Collapse;
  const [dietData, setDietData] = useState([]);
  const handleMealSelection = (name, content) => {
    setActiveMeal(name, content);
  };

  // when active meal changes pulls data from db, orders it, makes it available for other components
  useEffect(() => {
    if (userId) {
      const orderedDietData = [];
      db.collection('users')
        .doc(userId)
        .onSnapshot(doc => {
          const { diet } = doc.data();
          const dietNameAndContentArr = Object.entries(diet);
          for (let i = 0; i < dietNameAndContentArr.length; i += 1) {
            const mealName = dietNameAndContentArr[i][0];
            const mealContent = dietNameAndContentArr[i][1];
            // order stores meal positions. example: {pre-breakfast:0,breakfast:1}
            const mealPosition = order[mealName];
            orderedDietData[mealPosition] = {
              [mealName]: mealContent,
            };
          }
          setDietData(orderedDietData);
        });
    }
  }, [activeMeal, meals, userId]);

  if (!userId) {
    return <Redirect to='/login' />;
  }
  return (
    <>
      <MealCreator />
      <>
        <Collapse>
          {dietData.map(meal => {
            const mealName = Object.keys(meal)[0];
            const mealContent = Object.values(meal)[0];
            return (
              <Panel
                className='mealCreatorCollapsePanel'
                header={
                  <div
                    onClick={() => handleMealSelection(mealName, mealContent)}
                    onKeyDown={() => handleMealSelection(mealName, mealContent)}
                    className='mealName'
                    tabIndex={0}
                    role='button'
                  >
                    <div>
                      {mealName}
                      <DeleteMeal meals={dietData} className='deleteMeal' />
                    </div>
                  </div>
                }
              >
                <List
                  itemLayout='horizontal'
                  dataSource={mealContent}
                  renderItem={item => <ListItem item={item} />}
                />
              </Panel>
            );
          })}
        </Collapse>
      </>
    </>
  );
};

ManageDiet.propTypes = {
  userId: propTypes.string,
  activeMeal: propTypes.object, // eslint-disable-line
  setActiveMeal: propTypes.func,
  meals: propTypes.object, // eslint-disable-line
};
ManageDiet.defaultProps = {
  userId: '',
  activeMeal: {},
  setActiveMeal: x => x,
  meals: {},
};

const mapStateToProps = state => {
  return {
    meals: state.firebase.profile.diet,
    userId: state.firebase.auth.uid,
    activeMeal: state.DietReducer.activeMeal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveMeal: (mealName, mealContent) =>
      dispatch(reduxActiveMeal(mealName, mealContent)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDiet);
