import {
    FETCH_PLANTS_START,
    FETCH_PLANTS_SUCCESS,
    FETCH_PLANTS_FAILURE,
    ADD_PLANT_START,
    ADD_PLANT_SUCCESS,
    ADD_PLANT_FAILURE
} from '../actions';

const initialState = {
    plants: [],
    fetchingPlants: false,
    addingPlant: false
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
        case ADD_PLANT_START:
            return {
                ...state,
                addingPlant: true
            }
        case ADD_PLANT_SUCCESS:
            return {
                ...state,
                addingPlant: false,
                plants: [
                    ...state.plants,
                    action.payload
                ]
            }
        case ADD_PLANT_FAILURE:
            return {
                ...state,
                addingPlant: false
            }
        default:
            return {
                ...state
            }
    }
}

export default plantsReducer;