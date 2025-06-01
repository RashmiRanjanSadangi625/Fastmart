import { 
    CREATE_RATINGREVIEW_FAILURE,
    CREATE_RATINGREVIEW_REQUEST, 
    CREATE_RATINGREVIEW_SUCCESS,
    UPDATE_RATINGREVIEW_REQUEST,
    UPDATE_RATINGREVIEW_SUCCESS,
    UPDATE_RATINGREVIEW_FAILURE,
    GET_RATINGREVIEW_REQUEST,
    GET_RATINGREVIEW_SUCCESS,
    GET_RATINGREVIEW_FAILURE
} from "./ActionType";

const initialState = {
    isLoading: false,
    error: null,
    ratingReview: null, 
    ratingReviewStatus: null 
};

export const ratingReviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RATINGREVIEW_REQUEST:
        case UPDATE_RATINGREVIEW_REQUEST:
            return { ...state, isLoading: true, error: null };

        case CREATE_RATINGREVIEW_SUCCESS:
            return { ...state, isLoading: false, error: null, ratingReview: action.payload, ratingReviewStatus: "success" };

        case UPDATE_RATINGREVIEW_SUCCESS:
            return { ...state, isLoading: false, error: null, ratingReviewStatus: "updated" };

        case CREATE_RATINGREVIEW_FAILURE:
        case UPDATE_RATINGREVIEW_FAILURE:
            return { ...state, isLoading: false, error: action.payload, ratingReviewStatus: "failed" };

        case GET_RATINGREVIEW_REQUEST:
            return { ...state, isLoading: true, error: null };
        case GET_RATINGREVIEW_SUCCESS:
            return { ...state, isLoading: false, error: null, ratingReview: action.payload };
        case GET_RATINGREVIEW_FAILURE:
            return { ...state, isLoading: false, error: action.payload, ratingReviewStatus: "failed" };

        default:
            return state;
    } 
};
