import { combineReducers } from 'redux';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';
import plantsReducer from './plantsReducer';
import scheduleReducer from './scheduleReducer';

const rootReducer = combineReducers({
    userReducer,
    notificationReducer,
    plantsReducer,
    scheduleReducer
});

export default rootReducer;