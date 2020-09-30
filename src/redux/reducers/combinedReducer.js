import isLoggedIn from "./isLoggedIn";  //since store accepts 1 parameter for reducers, reducers must be combined
import { combineReducers } from "redux";


const allReducers = combineReducers({
    isLoggedIn
})

export default allReducers;