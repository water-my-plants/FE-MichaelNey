import axios from 'axios';
import { addNotifHelper } from './index'
export const FETCH_PLANTS_START = 'FETCH_PLANTS_START';
export const FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS';
export const FETCH_PLANTS_FAILURE = 'FETCH_PLANTS_FAILURE';
export const FETCH_PLANT_START = 'FETCH_PLANT_START';
export const FETCH_PLANT_SUCCESS = 'FETCH_PLANT_SUCCESS';
export const FETCH_PLANT_FAILURE = 'FETCH_PLANT_FAILURE';
export const ADD_PLANT_START = 'ADD_PLANT_START';
export const ADD_PLANT_SUCCESS = 'ADD_PLANT_SUCCESS';
export const ADD_PLANT_FAILURE = 'ADD_PLANT_FAILURE';
export const DELETE_PLANT_SUCCESS = 'DELETE_PLANT_SUCCESS';
export const DELETE_PLANT_FAILURE = 'DELETE_PLANT_FAILURE';

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

export const fetchPlant = (id) => dispatch => {
    dispatch({type: FETCH_PLANT_START});
    let token = localStorage.getItem('token');
    let headers = {
        'authorization': token
    }
    axios.get(`${process.env.REACT_APP_API}/plants/${id}`, { headers })
        .then(res => {
            dispatch({type: FETCH_PLANT_SUCCESS, payload: res.data});
        })
        .catch(err => {
            dispatch({type: FETCH_PLANT_FAILURE});
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
            console.log(res.data);
            dispatch({type: ADD_PLANT_SUCCESS, payload: res.data})
            dispatch(addNotifHelper('Successfully added plant!', 'success'));
        })
        .catch(err => {
            dispatch({type: ADD_PLANT_FAILURE})
            dispatch(addNotifHelper(err, 'error'));
        })
}

export const deletePlant = (id) => dispatch => {
    dispatch(addNotifHelper('Deleting Plant.'));
    let token = localStorage.getItem('token');
    let headers = {
        'authorization': token
    };
    axios.delete(`${process.env.REACT_APP_API}/plants/${id}`, { headers })
        .then(res => {
            dispatch(addNotifHelper('Deleted Plant.', 'success'));
            dispatch({type: DELETE_PLANT_SUCCESS, payload: id});
        })
        .catch(err => {
            dispatch(addNotifHelper(err, 'error'));
            dispatch({type: DELETE_PLANT_FAILURE});
        })
}