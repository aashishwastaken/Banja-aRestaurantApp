import * as ActionType from './ActionTypes';
import baseUrl from '../shared/baseUrl';
export const comments = (state = {
    isLoading: null,
    errorMess: null,
    comments: []
}, action) => {
  
    console.log("MISSION ACCOMLISHED!!");

    switch (action.type) {
       
        case ActionType.ADD_COMMENTS: {
          action.payload=  action.payload.filter(x=>!comments.includes(x));
            return { ...state, isLoading: false, errorMess: null, comments: action.payload };
        };
        case ActionType.COMMENTS_FAILED: return { ...state, errorMess: action.payload, isLoading: false };
        case ActionType.ADD_COMMENT: {
            
            action.payload.id=state.comments.length;
            return { ...state, isLoading: false, errorMess: null, comments: [...state.comments,(action.payload)] }};
        
        
        default: return state;

    }

};