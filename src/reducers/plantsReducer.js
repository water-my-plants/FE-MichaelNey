import {
    FETCH_PLANTS_START,
    FETCH_PLANTS_SUCCESS,
    FETCH_PLANTS_FAILURE
} from '../actions';

const initialState = {
    plants: [],
    fetchingPlants: false,
}

const plantsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PLANTS_START:
            return {
                ...state,
                fetchingPlants: true
            }
        case FETCH_PLANTS_SUCCESS:
            return {
                ...state,
                fetchingPlants: false,
                plants: action.payload
            }
        case FETCH_PLANTS_FAILURE:
            return {
                ...state,
                fetchingPlants: false,
                plants: []
            }
        default:
            return {
                ...state
            }
    }
}

export default plantsReducer;