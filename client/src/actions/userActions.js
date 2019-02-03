import axios from 'axios';
import { addNotifHelper } from './notificationActions'; //Returns object of an action type and payload for creating notification popups.

//Action Types
export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_REGISTER_START = 'USER_REGISTER_START';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';



export const userLogin = (username, password) => dispatch => {
    let body = {
        username,
        password
    }
    dispatch({type: USER_LOGIN_START});
    axios.post(`${process.env.REACT_APP_API}/login`, body)
        .then(res => {
            dispatch({type: USER_LOGIN_SUCCESS});
            console.log(res);
        })
        .catch(err => {
            dispatch({type: USER_LOGIN_FAILURE});
            dispatch(addNotifHelper(err.response.data.error, 'error'));
        });
}

export const userRegister = (username, email, password) => dispatch => {
    let body = {
        username,
        email,
        password
    }
    dispatch({type: USER_REGISTER_START});
    axios.post(`${process.env.REACT_APP_API}/register`, body)
        .then(res => {
            dispatch({type: USER_REGISTER_SUCCESS});
            console.log(res);
        })
        .catch(err => {
            dispatch({type: USER_REGISTER_FAILURE});
            dispatch(addNotifHelper(err.response.data.error, 'error'));
        });
}