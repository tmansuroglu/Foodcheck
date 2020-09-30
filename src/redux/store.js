import { createStore } from "redux";
import allReducers from "./reducers/combinedReducer";

let store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); //2nd parameter is for redux dev tool
//store cant accept more than 1 reducer so they need to be combined



export default store