import { combineReducers } from 'redux';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
    userReducer,
    notificationReducer
});

export default rootReducer;