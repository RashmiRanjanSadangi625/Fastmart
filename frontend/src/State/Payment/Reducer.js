import { 
    CREATE_PAYMENT_FAILURE,
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE
} from "./ActionType";

const initialState = {
    isLoading: false,
    error: null,
    payment: null, // Stores payment details
    paymentStatus: null // Tracks payment status
};

export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PAYMENT_REQUEST:
        case UPDATE_PAYMENT_REQUEST:
            return { ...state, isLoading: true, error: null };

        case CREATE_PAYMENT_SUCCESS:
            return { ...state, isLoading: false, error: null, payment: action.payload, paymentStatus: "success" };

        case UPDATE_PAYMENT_SUCCESS:
            return { ...state, isLoading: false, error: null, paymentStatus: "updated" };

        case CREATE_PAYMENT_FAILURE:
        case UPDATE_PAYMENT_FAILURE:
            return { ...state, isLoading: false, error: action.payload, paymentStatus: "failed" };

        default:
            return state;
    }
};
