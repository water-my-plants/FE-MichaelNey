import axios from 'axios';

//Action Types
export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const userLogin = (username, password) => dispatch => {
    dispatch(USER_LOGIN_START);
    axios.post(`${process.env.REACT_APP_API}/login`, {username, password})
        .then(res => console.log(res))
        .catch(err => console.log(err));
}