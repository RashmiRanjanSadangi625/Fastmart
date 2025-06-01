import { api } from "../../config/apiConfig";
import{
    CREATE_RATINGREVIEW_FAILURE,
    CREATE_RATINGREVIEW_REQUEST, 
    CREATE_RATINGREVIEW_SUCCESS,
    UPDATE_RATINGREVIEW_REQUEST,
    UPDATE_RATINGREVIEW_FAILURE,
    GET_RATINGREVIEW_REQUEST,
    GET_RATINGREVIEW_FAILURE,
    GET_RATINGREVIEW_SUCCESS
} from "./ActionType"

export const createRatingReview=(reqData)=> async (dispatch)=>
{
    dispatch({ type:CREATE_RATINGREVIEW_REQUEST });
    
    try {
        console.log("console",reqData); 

        const { data } = await api.post(`/api/ratings/create`,reqData); 
        console.log("console",data);    
        
        dispatch({ type:CREATE_RATINGREVIEW_SUCCESS });
        
    } catch (error) {
        dispatch({ type: CREATE_RATINGREVIEW_FAILURE, payload: error.message });
    }
}

export const getRatingReviews=(userId,productId)=> async (dispatch)=>
{
    console.log("rating received data:",userId,productId);    

    dispatch({ type: GET_RATINGREVIEW_REQUEST });
    
    try {
        const { data } = await api.get(`/api/ratings/data?userId=${userId}&productId=${productId}`);
        console.log("rating data:",data);    
        
        dispatch({ type:GET_RATINGREVIEW_SUCCESS,payload: data });
    } catch (error) {
        dispatch({ type: GET_RATINGREVIEW_FAILURE, payload: error.message });
    }
}