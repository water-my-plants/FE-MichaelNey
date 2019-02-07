import {
    FETCH_PLANTS_START,
    FETCH_PLANTS_SUCCESS,
    FETCH_PLANTS_FAILURE,
    FETCH_PLANT_START,
    FETCH_PLANT_SUCCESS,
    FETCH_PLANT_FAILURE,
    ADD_PLANT_START,
    ADD_PLANT_SUCCESS,
    ADD_PLANT_FAILURE,
    DELETE_PLANT_SUCCESS,
    DELETE_PLANT_FAILURE,
    UPDATE_PLANT_START,
    UPDATE_PLANT_SUCCESS,
    UPDATE_PLANT_FAILURE
} from '../actions';

const initialState = {
    plants: [],
    fetchingPlants: false,
    fetchingPlant: false,
    fetchingSchedule: false,
    addingPlant: false,
    addingSchedule: false,
    lastFetchedPlant: null,
    updatingPlant: false
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
                plants: action.payload.sort((a, b) => {
                    if(b.schedule.length > 0 && a.schedule.length > 0) {
                        let schedB = b.schedule.filter(s => new Date(s.watering_time).getTime() > Date.now()).sort();
                        let schedA = a.schedule.filter(s => new Date(s.watering_time).getTime() > Date.now()).sort();
                        if(schedB.length < 1) {
                            return -1;
                        }
                        if(schedA.length < 1) {
                            return 1;
                        }
                        if(new Date(schedB[0].watering_time).getTime() > new Date(schedA[0].watering_time).getTime()) {
                            return -1
                        } else {
                            return 1;
                        }
                    } else {
                        return 1;
                    }
                })

            }
        case FETCH_PLANTS_FAILURE:
            return {
                ...state,
                fetchingPlants: false,
                plants: []
            }
        case FETCH_PLANT_START:
            return {
                ...state,
                fetchingPlant: true,
                lastFetchedPlant: null
            }
        case FETCH_PLANT_SUCCESS:
            return {
                ...state,
                fetchingPlant: false,
                lastFetchedPlant: action.payload,
                plants: [
                    ...state.plants.filter(p => p.id !== action.payload.id),
                    action.payload
                ]
            }
        case FETCH_PLANT_FAILURE:
            return { 
                ...state,
                fetchingPlant: false,
                lastFetchedPlant: 'error'
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
        case DELETE_PLANT_SUCCESS:
            return {
                ...state,
                plants: state.plants.filter(f => f.id !== action.payload)
            }
        case DELETE_PLANT_FAILURE: 
            return {
                ...state
            }
        case UPDATE_PLANT_START:
            return {
                ...state,
                updatingPlant: true
            }
        case UPDATE_PLANT_SUCCESS:
            return {
                ...state,
                updatingPlant: false,
                plants: [
                    ...state.plants.filter(p => p.id !== action.payload.id),
                    action.payload
                ],
                lastFetchedPlant: action.payload
            }
        case UPDATE_PLANT_FAILURE:
            return {
                ...state,
                updatingPlant: false
            }
        default:
            return {
                ...state
            }
    }
}

export default plantsReducer;