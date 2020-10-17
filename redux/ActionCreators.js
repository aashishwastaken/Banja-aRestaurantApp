import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (jsobj) =>( { type: ActionTypes.ADD_COMMENT, payload:jsobj });

export const deleteFavorite=(dishId)=>(dispatch)=>{
    dispatch({type:ActionTypes.DELETE_FAVORITE,payload:dishId});
};
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const x = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    x.date=new Date().toISOString();
    setTimeout(() => {dispatch(addComment(x))}, 2000);

};



export const postFavorite = (dish) => (dispatch) => {
    dispatch({ type: ActionTypes.ADD_FAVORITE, payload: dish });
};

export const fetchDishes = () => (dispatch) => {
    //  console.log("JSON:==================================================================>"+baseUrl+"dishes");
    dispatch({ type: ActionTypes.DISHES_LOADING });

    return fetch(baseUrl + "dishes")
        .then(response => {
            if (response.ok) {
                //    console.log("JSON:ACTION::::CREATOR==>>response=======>"+JSON.stringify(response));
                return response;
            } else {
                const er = new Error("Error: " + response.status + "=" + response.statusText);
                er.response = response;
                throw er;
            }
        }, error => {
            var errorMess = new Error(error.message);
            throw errorMess;
        })
        .then(response => response.json())
        .then(dishes1 => dispatch({ type: ActionTypes.ADD_DISHES, payload: dishes1 }))
        .catch(err => {
            console.log("JSON:ACTION::::ERROR=======>" + err.message);
            dispatch({ type: ActionTypes.DISHES_FAILED, payload: err.message });
        });
};

export const fetchPromos = () => (dispatch) => {
    dispatch({ type: ActionTypes.PROMOS_LOADING });
    return fetch(baseUrl + "promotions")
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const er = new Error("Error: " + response.status + "=" + response.statusText);
                er.response = response;
                throw er;
            }
        }, error => {
            var errorMess = new Error(error.message);
            throw errorMess;
        })
        .then(response => response.json())
        .then(promos => dispatch({ type: ActionTypes.ADD_PROMOS, payload: promos }))
        .catch(err => dispatch({ type: ActionTypes.PROMOS_FAILED, payload: err.message }));
};

export const fetchLeaders = () => (dispatch) => {
    dispatch({ type: ActionTypes.LEADERS_LOADING });
    return fetch(baseUrl + "leaders")
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const er = new Error("Error: " + response.status + "=" + response.statusText);
                er.response = response;
                throw er;
            }
        }, error => {
            var errorMess = new Error(error.message);
            throw errorMess;
        })
        .then(response => response.json())
        .then(leaders => dispatch({ type: ActionTypes.ADD_LEADERS, payload: leaders }))
        .catch(err => dispatch({ type: ActionTypes.LEADERS_FAILED, payload: err.message }));
};

export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + "comments")
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const er = new Error("Error: " + response.status + "=" + response.statusText);
                er.response = response;
                throw er;
            }
        }, error => {
            var errorMess = new Error(error.message);
            throw errorMess;
        })
        .then(response => response.json())
        .then(comments => dispatch({ type: ActionTypes.ADD_COMMENTS, payload: comments }))
        .catch(err => dispatch({ type: ActionTypes.COMMENTS_FAILED, payload: err.message }));
};