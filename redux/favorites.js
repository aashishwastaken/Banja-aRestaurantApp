import * as ActionTypes from './ActionTypes';

export const favorites = (state = [0], action) => {

   
    switch (action.type) {
        //case ActionTypes.POST_FAVORITE: return { ...state,  favorites: [] };
        case ActionTypes.ADD_FAVORITE:{
                if(state.some(el=>el==action.payload)){
                    return state;
                }else{
                    return [...state,action.payload ];
                }
            };
            case ActionTypes.DELETE_FAVORITE:{
                return state.filter(x=>x!=action.payload);
            }
        
       
        default: return state;

    }

};