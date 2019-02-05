import axios from 'axios';
import { addNotifHelper } from './index'
export const FETCH_PLANTS_START = 'FETCH_PLANTS_START';
export const FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS';
export const FETCH_PLANTS_FAILURE = 'FETCH_PLANTS_FAILURE';

export const fetchPlants = () => dispatch => {
    dispatch({type: FETCH_PLANTS_START});
    let userId = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    let headers = {
        'authorization': token
    }
    axios.get(`${process.env.REACT_APP_API}/users/${userId}/plants`, { headers })
        .then(res => {
            dispatch({type: FETCH_PLANTS_SUCCESS, payload: res.data});
        })
        .catch(err => {
            dispatch({type: FETCH_PLANTS_FAILURE});
            addNotifHelper(err, 'error');
        });
}