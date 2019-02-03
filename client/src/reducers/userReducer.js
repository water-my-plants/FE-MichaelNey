//Action Types
import { 
    USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_REGISTER_START, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE
} from '../actions';

const initialState = {
    username: '',
    email: '',
    phone: '',
    imgUrl: '',
    loggedIn: false,
    loggingIn: false, //Used for login form loading state.
    registering: false //Used for registration form loading state.
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
        case USER_LOGIN_START:
            return {
                ...state,
                loggingIn: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                username: action.payload.username,
                email: action.payload.email,
                phone: action.payload.phone,
                imgurl: action.payload.imgUrl
            }
        case USER_LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false
            }
        case USER_REGISTER_START:
            return {
                ...state,
                registering: true
            }
        case USER_REGISTER_SUCCESS: 
            return {
                ...state,
                registering: false,
                loggedIn: true,
                username: action.payload.username,
                email: action.payload.email,
                phone: action.payload.phone,
                imgurl: action.payload.imgUrl
            }
        case USER_REGISTER_FAILURE:
            return {
                ...state,
                registering: false
            }
    }
}

export default userReducer;