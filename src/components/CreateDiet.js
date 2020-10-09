import React from "react";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { createMeal } from "../redux/actions/DietActions"
import Meal from "./Meal"

const CreateDiet = (props) => {
    const onClick = ({ key }) => {
        props.createMeal(key)
    };

    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="breakfast">Breakfast</Menu.Item>
            <Menu.Item key="lunch">Lunch</Menu.Item>
            <Menu.Item key="dinner">Dinner</Menu.Item>
            <Menu.Item key="snack">Snack</Menu.Item>
        </Menu>
    );

    return (
        <>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    Add Meal <DownOutlined />
                </a>
            </Dropdown>
            {props.meals.map(meal => {
                return <Meal name={Object.keys(meal)[0]} />
            })}
        </>
    )
}

const mapStateToProps = (state) => { //makes the state accessible as props(isLogged will be a props for the functional component above)
    return {
        meals: state.DietReducer.meals
    }
}


const mapDispatchToProps = (dispatch) => {  //allows you to change state
    return {
        createMeal: (meal) => dispatch(createMeal(meal)) // logIn refers to a type of action(check actions folder).   must be a function. dispatches action type, redux executes it accordingly
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDiet);


