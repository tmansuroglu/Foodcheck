// import React from "react";
// import { Col, Collapse, Menu, Dropdown, Input } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { connect } from "react-redux";
// import { CreateMeal, AddFood } from "../redux/actions/DietActions";
// import db from "../firebaseConfig";
// import { Redirect } from "react-router-dom";

// const { Panel } = Collapse;
// const { Search } = Input;

// const ManageDiet = props => {
//     //meal dropdown
//     const menu = (
//         <Menu>
//             <Menu.Item onClick={() => handleMealSelection("Breakfast")}>
//                 Breakfast
//             </Menu.Item>
//             <Menu.Item onClick={() => handleMealSelection("Lunch")}>
//                 Lunch
//             </Menu.Item>
//             <Menu.Item onClick={() => handleMealSelection("Dinner")}>
//                 Dinner
//             </Menu.Item>
//             <Menu.Item onClick={() => handleMealSelection("Snack")}>
//                 Snack
//             </Menu.Item>
//         </Menu>
//     );

//     // Allows user to create meals,
//     const handleMealSelection = meal => {
//         const match = meals.find(eachMeal => meal === Object.keys(eachMeal)[0]); // Object.keys(meal)[0] means meal name
//         if (match && match !== "Snack") {
//             alert("You can only add snacks!");
//         } else {
//             props.newMeal(meal);
//             getDietData();
//         }
//     };

//     //stores meals and foodLists
//     const [meals, setMeals] = React.useState([]);

//     // fetches all meals and food lists and puts it in state
//     const getDietData = () => {
//         db.collection("users")
//             .doc(props.uid)
//             .get()
//             .then(userData => {
//                 const mealsList = [];
//                 for (const meal in userData.data().diet) {
//                     const foodList = userData.data().diet[meal];
//                     mealsList.push({ [meal]: foodList }); // in db diet is an obj, this turns it into array
//                 }
//                 setMeals(mealsList);
//             });
//     };

//     //on first load, put every meal on screen
//     React.useEffect(() => {
//         getDietData();
//     }, []);

//     const [foodList, setFoodList] = React.useState([]);
//     // define action and reducer too
//     const handleAddFood = (mealName, food) => {
//         console.log("this food was added=>", food);
//         props.addFood(mealName, food);
//         getDietData();
//         const targetMeal = meals.find(
//             meal => mealName === Object.keys(meal)[0]
//         );
//         setFoodList(Object.values(targetMeal)[0]);
//     };

//     if (props.uid) {
//         return (
//             <Col xs={24} sm={24} md={6} lg={6} xl={4}>
//                 <Dropdown overlay={menu}>
//                     <a
//                         className="ant-dropdown-link"
//                         onClick={e => e.preventDefault()}
//                     >
//                         <PlusOutlined /> Add Meal
//                     </a>
//                 </Dropdown>

//                 <Collapse>
//                     {meals.map((meal, id) => (
//                         <Panel header={Object.keys(meal)[0]} key={id}>
//                             <Search
//                                 placeholder="add food"
//                                 enterButton={<PlusOutlined />}
//                                 onSearch={food =>
//                                     handleAddFood(Object.keys(meal)[0], food)
//                                 }
//                             />
//                             <ul>
//                                 {foodList.map(food => (
//                                     <li>{food}</li>
//                                 ))}
//                             </ul>
//                         </Panel>
//                     ))}
//                 </Collapse>
//             </Col>
//         );
//     } else {
//         return <Redirect to="/login" />;
//     }
// };

// const mapStateToProps = state => {
//     return {
//         uid: state.firebase.auth.uid,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         newMeal: mealName => dispatch(CreateMeal(mealName)),
//         addFood: (mealName, food) => dispatch(AddFood(mealName, food)),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ManageDiet);
