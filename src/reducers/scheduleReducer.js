import {
    FETCH_SCHEDULE_START,
    FETCH_SCHEDULE_SUCCESS,
    FETCH_SCHEDULE_FAILURE,
    ADD_SCHEDULE_START,
    ADD_SCHEDULE_SUCCESS,
    ADD_SCHEDULE_FAILURE,
    DELETE_SCHEDULE_START,
    DELETE_SCHEDULE_SUCCESS,
    DELETE_SCHEDULE_FAILURE,
    DELETE_SINGLE_SCHEDULE_START,
    DELETE_SINGLE_SCHEDULE_SUCCESS,
    DELETE_SINGLE_SCHEDULE_FAILURE
} from '../actions';

const initialState = {
    waterSchedule: [],
    fetchingSchedule: false,
    addingSchedule: false,
    deletingSchedule: false,
    deletingSingleSchedule: false
};

const scheduleReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_SCHEDULE_START:
            return {
                ...state,
                fetchingSchedule: true,
                waterSchedule: [] //This gets rid of whatever schedule that was loaded previously from another plant.
            }
        case FETCH_SCHEDULE_SUCCESS:
            return {
                ...state,
                fetchingSchedule: false,
                waterSchedule: action.payload
            }
        case FETCH_SCHEDULE_FAILURE:
            return {
                ...state,
                fetchingSchedule: false
            }
        case ADD_SCHEDULE_START:
            return {
                ...state,
                addingSchedule: true
            }
        case ADD_SCHEDULE_SUCCESS:
            return {
                ...state,
                addingSchedule: false,
                waterSchedule: action.payload
            }
        case ADD_SCHEDULE_FAILURE:
            return {
                ...state,
                addingSchedule: false
            }
        case DELETE_SCHEDULE_START:
            return {
                ...state,
                deletingSchedule: true
            }
        case DELETE_SCHEDULE_SUCCESS:
            return {
                ...state,
                deletingSchedule: false,
                waterSchedule: []
            }
        case DELETE_SCHEDULE_FAILURE:
            return {
                ...state,
                deletingSchedule: false
            }
        case DELETE_SINGLE_SCHEDULE_START:
            return {
                ...state,
                deletingSingleSchedule: true
            }
        case DELETE_SINGLE_SCHEDULE_SUCCESS:
            return {
                ...state,
                deletingSingleSchedule: false,
                waterSchedule: action.payload
            }
        case DELETE_SINGLE_SCHEDULE_FAILURE:
            return {
                ...state,
                deletingSingleSchedule: false
            }
        default:
            return {
                ...state
            }
    }
}

export default scheduleReducer;