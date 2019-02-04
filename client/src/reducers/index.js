import { combineReducers } from 'redux';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';
import plantsReducer from './plantsReducer';

const rootReducer = combineReducers({
    userReducer,
    notificationReducer,
    plantsReducer
});

export default rootReducer;