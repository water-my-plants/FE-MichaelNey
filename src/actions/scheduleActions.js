import axios from 'axios';
import { addNotifHelper } from './index';

export const FETCH_SCHEDULE_START = 'FETCH_SCHEDULE_START';
export const FETCH_SCHEDULE_SUCCESS = 'FETCH_SCHEDULE_SUCCESS';
export const FETCH_SCHEDULE_FAILURE = 'FETCH_SCHEDULE_FAILURE';
export const ADD_SCHEDULE_START = 'ADD_SCHEDULE_START';
export const ADD_SCHEDULE_SUCCESS = 'ADD_SCHEDULE_SUCCESS';
export const ADD_SCHEDULE_FAILURE = 'ADD_SCHEDULE_FAILURE';
export const DELETE_SCHEDULE_START = 'DELETE_SCHEDULE_START';
export const DELETE_SCHEDULE_SUCCESS = 'DELETE_SCHEDULE_SUCCESS';
export const DELETE_SCHEDULE_FAILURE = 'DELETE_SCHEDULE_FAILURE';

export const fetchSchedule = (id) => dispatch => {
    dispatch({type: FETCH_SCHEDULE_START});
    let token = localStorage.getItem('token');
    let headers = {
        'authorization': token
    }
    axios.get(`${process.env.REACT_APP_API}/plants/${id}/schedule`, { headers })
        .then(res => {
            console.log(res.data);
            dispatch({type: FETCH_SCHEDULE_SUCCESS, payload: res.data});
        })
        .catch(err => {
            dispatch({type: FETCH_SCHEDULE_FAILURE});
            //If there are no schedules for the plant, server responds with 400 status code. If it does that, we know to just display an empty schedule table. Otherwise, give an actual error notification popup to the user.
            if(err.response) {
                if(err.response.status === 400) {
                    dispatch({type: FETCH_SCHEDULE_SUCCESS, payload: []});
                } else {
                    dispatch(addNotifHelper(err, 'error'));
                }
            }
            
        });
}

export const addSchedule = (id, times) => dispatch => {
    dispatch({type: ADD_SCHEDULE_START});
    let token = localStorage.getItem('token');
    let headers = {
        'authorization': token
    }
    axios.post(`${process.env.REACT_APP_API}/plants/${id}`, times, { headers })
        .then(res => {
            dispatch({type: ADD_SCHEDULE_SUCCESS, payload: res.data});
            dispatch(addNotifHelper(`Added to your Plant's watering schedule!`, 'success'));
        })
        .catch(err => {
            dispatch({type: ADD_SCHEDULE_FAILURE});
            dispatch(addNotifHelper(err, 'error'));
        });
}

//Awaiting DELETE route for Plant Water Schedules.
// export const deleteSchedule = (id) => {
//     dispatch({type: DELETE_SCHEDULE_START});
//     let token = localStorage.getItem('token');
//     let headers = {
//         'authorization': token
//     }
//     axios.get(`${process.env.REACT_APP_API}/plants/${id}/schedule`, { headers })
//         .then(res => {
//             dispatch({type: DELETE_SCHEDULE_SUCCESS, payload: res.data});
//         })
//         .catch(err => {
//             dispatch({type: DELETE_SCHEDULE_FAILURE});
//             //If there are no schedules for the plant, server responds with 400 status code. If it does that, we know to just display an empty schedule table. Otherwise, give an actual error notification popup to the user.
//             if(err.response.status === 400) {
//                 dispatch({type: DELETE_SCHEDULE_SUCCESS, payload: []});
//             } else {
//                 dispatch(addNotifHelper(err, 'error'));
//             }
//         });
// }