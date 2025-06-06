import { GET_USER_FAILURE, 
    GET_USER_REQUEST, 
    GET_USER_SUCCESS, 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    REGISTER_FAILURE, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE
 } from "./ActionType"

const initialState={
    user:null,
    mailSentAck:null,
    ack:null,
    isLoading:false,
    error:null,
    jwt:null
}

export const authReducer=(state=initialState,action)=>
{
    switch(action.type)
    {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {...state,isLoading:true,error:null}
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {...state,isLoading:false,error:null,jwt:action.payload}
        case GET_USER_SUCCESS:
            return {...state,isLoading:false,error:null,user:action.payload}
        case FORGOT_PASSWORD_SUCCESS:
            return {...state,isLoading:false,error:null,mailSentAck:action.payload}
        case UPDATE_PASSWORD_SUCCESS:
            return {...state,isLoading:false,error:null,ack:action.payload}
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case FORGOT_PASSWORD_FAILURE:
        case UPDATE_PASSWORD_FAILURE:
            return {...state,isLoading:false,error:action.payload}
        case LOGOUT:
            return {...initialState}
        default:
            return state;
    }
}