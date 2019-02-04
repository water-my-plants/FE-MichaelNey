import axios from 'axios';
import { addNotifHelper } from './notificationActions'; //Returns object of an action type and payload for creating notification popups.

//Action Types
export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_REGISTER_START = 'USER_REGISTER_START';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';


export const userLogin = (username, password) => dispatch => {
    let body = {
        username,
        password
    }
    dispatch({type: USER_LOGIN_START});
    axios.post(`${process.env.REACT_APP_API}/login`, body)
        .then(res => {
            localStorage.setItem('token', res.data.token);
            dispatch({type: USER_LOGIN_SUCCESS, payload: res.data.user});
            dispatch(addNotifHelper('Welcome!'));
        })
        .catch(err => {
            dispatch({type: USER_LOGIN_FAILURE});
            dispatch(addNotifHelper(err, 'error'));
        });
}

export const userLogout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({type: USER_LOGOUT});
}

export const userRegister = (username, email, phone, password) => dispatch => {
    let body = {
        username,
        email,
        phone,
        password
    };
    dispatch({type: USER_REGISTER_START});
    axios.post(`${process.env.REACT_APP_API}/register`, body)
        .then(res => {
            dispatch({type: USER_REGISTER_SUCCESS, payload: res.data});
            dispatch(addNotifHelper('Successfully Registered! Please login.', 'success'));
        })
        .catch(err => {
            dispatch({type: USER_REGISTER_FAILURE});
            dispatch(addNotifHelper(err, 'error'));
        });
}