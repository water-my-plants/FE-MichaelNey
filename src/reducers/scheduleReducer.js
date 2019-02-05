import {
    FETCH_SCHEDULE_START,
    FETCH_SCHEDULE_SUCCESS,
    FETCH_SCHEDULE_FAILURE,
} from '../actions';

const initialState = {
    waterSchedule: [],
    fetchingSchedule: false
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
        default:
            return {
                ...state
            }
    }
}

export default scheduleReducer;