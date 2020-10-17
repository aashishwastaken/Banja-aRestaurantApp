import * as ActionType from './ActionTypes';

export const leaders = (state = {
    isLoading: null,
    errorMess: null,
    leaders: []
}, action) => {


    switch (action.type) {
        case ActionType.LEADERS_LOADING: return { ...state, isLoading: true, errorMess: null, leaders: [] };
        case ActionType.ADD_LEADERS: return { ...state, isLoading: false, errorMess: null, leaders: action.payload };
        case ActionType.LEADERS_FAILED: return { ...state, errorMess: action.payload, isLoading: false };
        default: return state;

    }

};