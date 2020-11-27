import AuthReducer from './AuthReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import DietReducer from './DietReducer';

const allReducers = combineReducers({
    AuthReducer,
    DietReducer,
    firebase: firebaseReducer,
});

export default allReducers;
