import * as ActionType from './ActionTypes';

export const promotions = (state = {
    isLoading: null,
    errorMess: null,
    promotions: []
}, action) => {


    switch (action.type) {
        case ActionType.PROMOS_LOADING: return { ...state, isLoading: true, errorMess: null, promotions: [] };
        case ActionType.ADD_PROMOS: return { ...state, isLoading: false, errorMess: null, promotions: action.payload };
        case ActionType.PROMOS_FAILED: return { ...state, errorMess: action.payload, isLoading: false };
        default: return state;

    }

};