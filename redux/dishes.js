import * as ActionTypes from './ActionTypes';

export const dishes = (state = {
    isLoading: null,
    errorMess: null,
    dishes: []
}, action) => {

   
    switch (action.type) {
        case ActionTypes.DISHES_LOADING: return { ...state, isLoading: true, errorMess: null, dishes: [] };
        case ActionTypes.ADD_DISHES: return { ...state, isLoading: false, errorMess: null, dishes: action.payload };
        case ActionTypes.DISHES_FAILED: return { ...state, errorMess: action.payload, isLoading: false };
        default: return state;

    }

};