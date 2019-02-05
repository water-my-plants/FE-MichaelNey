import axios from 'axios';
import { addNotifHelper } from './index'
export const FETCH_PLANTS_START = 'FETCH_PLANTS_START';
export const FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS';
export const FETCH_PLANTS_FAILURE = 'FETCH_PLANTS_FAILURE';
export const ADD_PLANT_START = 'ADD_PLANT_START';
export const ADD_PLANT_SUCCESS = 'ADD_PLANT_SUCCESS';
export const ADD_PLANT_FAILURE = 'ADD_PLANT_FAILURE';

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
            dispatch(addNotifHelper(err, 'error'));
        });
}

export const addPlant = (plant) => dispatch => {
    dispatch({type: ADD_PLANT_START});
    let userId = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    let headers = {
        'authorization': token
    };
    axios.post(`${process.env.REACT_APP_API}/users/${userId}/plants`, plant, { headers })
        .then(res => {
            dispatch({type: ADD_PLANT_SUCCESS, payload: res.data})
            dispatch(addNotifHelper('Successfully added plant!', 'success'));
        })
        .catch(err => {
            dispatch({type: ADD_PLANT_FAILURE})
            dispatch(addNotifHelper(err, 'error'));
        })
}