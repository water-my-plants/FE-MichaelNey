//Action Types
import { 
    USER_LOGIN_START, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAILURE, 
    USER_REGISTER_START, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAILURE, 
    USER_LOGOUT, 
    USER_RETURN_START, 
    USER_RETURN_SUCCESS,
    USER_RETURN_FAILURE
} from '../actions';

const initialState = {
    userId: '',
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
        case USER_LOGOUT:
            return {
                ...state,
                userId: '',
                username: '',
                email: '',
                phone: '',
                imgUrl: '',
                loggedIn: false
            }
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
                userId: action.payload.id,
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
                registered: true,
                registering: false,
                loggedIn: false
            }
        case USER_REGISTER_FAILURE:
            return {
                ...state,
                registering: false
            }
        case USER_RETURN_START: 
            return {
                ...state,
                returning: true
            }
        case USER_RETURN_SUCCESS: 
            return {
                ...state,
                returning: false,
                loggingIn: false,
                loggedIn: true,
                userId: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                phone: action.payload.phone,
                imgurl: action.payload.imgUrl
            }
        case USER_RETURN_FAILURE:
            return {
                ...state,
                returning: false,
                loggingIn: false
            }
        default:
            return state;
    }
}

export default userReducer;