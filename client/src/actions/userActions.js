import axios from 'axios';

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
        .then(res => console.log(res))
        .catch(err => console.log(err.response.data));
}

export const userRegister = (username, email, password) => dispatch => {
    let body = {
        username,
        email,
        password
    }
    dispatch({type: USER_LOGIN_START});
    axios.post(`${process.env.REACT_APP_API}/register`, body)
        .then(res => console.log(res))
        .catch(err => console.log(err.response.data));
}