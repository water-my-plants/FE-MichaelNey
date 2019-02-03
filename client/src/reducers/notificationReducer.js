//Action Types

import {
    NOTIF, REMOVE_NOTIF
} from '../actions'

const initialState = {
    notifications: []
};

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case NOTIF:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        ...action.payload
                    }
                ]
            }
        case REMOVE_NOTIF:
            return {
                ...state,
                notifications: state.notifications.filter(n => n.key !== action.payload.key)
            }
        default: 
            return state;
    }
    
}

export default notificationReducer;