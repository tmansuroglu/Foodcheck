import React, { useState, useEffect } from 'react';
import { Col, Collapse, List } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import db from '../../../firebaseConfig';
import order from '../mealOrder';
import DeleteMeal from '../DeleteMeal';
import MealCreator from '../CreateMeal';
import ListItem from '../MealItem';
import { ActiveMeal } from '../../../redux/actions/DietActions';
import './index.css';

const ManageDiet = ({ uid, activeMeal, setActiveMeal, meals }) => {
    const { Panel } = Collapse;

    const [localDietData, setLocalDietData] = useState([]);

    function handleMealSelection(name, content) {
        setActiveMeal(name, content);
    }

    useEffect(() => {
        if (uid) {
            const orderedDietData = [];
            db.collection('users')
                .doc(uid)
                .onSnapshot(function (doc) {
                    const dietData = doc.data().diet;

                    for (const meal in dietData) {
                        const index = order[meal];
                        orderedDietData[index] = {
                            [meal]: dietData[meal],
                        };
                    }
                    setLocalDietData(orderedDietData);
                });
        }
    }, [activeMeal, meals, uid]);
    if (uid) {
        return (
            <Col xs={24} sm={24} md={6} lg={4} xl={4} xxl={4}>
                <MealCreator />
                {
                    <>
                        <Collapse>
                            {localDietData.map((meal, index) => {
                                const mealName = Object.keys(meal)[0];
                                const mealContent = Object.values(meal)[0];
                                return (
                                    <Panel
                                        className='mealCreatorCollapsePanel'
                                        header={
                                            <div
                                                onClick={e =>
                                                    handleMealSelection(
                                                        mealName,
                                                        mealContent
                                                    )
                                                }
                                            >
                                                {mealName}

                                                <DeleteMeal
                                                    meals={localDietData}
                                                    className='deleteMeal'
                                                />
                                            </div>
                                        }
                                    >
                                        <List
                                            itemLayout='horizontal'
                                            dataSource={mealContent}
                                            renderItem={item => (
                                                <ListItem item={item} />
                                            )}
                                        />
                                    </Panel>
                                );
                            })}
                        </Collapse>
                    </>
                }
            </Col>
        );
    } else {
        return <Redirect to='/login' />;
    }
};
const mapStateToProps = state => {
    return {
        meals: state.firebase.profile.diet,
        uid: state.firebase.auth.uid,
        activeMeal: state.DietReducer.activeMeal,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setActiveMeal: (mealName, mealContent) =>
            dispatch(ActiveMeal(mealName, mealContent)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDiet);
