import { act } from "react";
import {
    GET_ORDERS_REQUEST, 
    GET_ORDERS_SUCCESS, 
    GET_ORDERS_FAILURE,
    PLACED_ORDER_REQUEST,
    PLACED_ORDER_FAILURE,
    PLACED_ORDER_SUCCESS,
    CONFIRMED_ORDER_REQUEST,
    CONFIRMED_ORDER_SUCEESS,
    CONFIRMED_ORDER_FAILURE,
    DELIVERED_ORDER_REQUEST,
    DELIVERED_ORDER_SUCCESS,
    DELIVERED_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,   
    DELETE_ORDER_SUCCESS,   
    DELETE_ORDER_FAILURE,  
    SHIP_ORDER_REQUEST ,
    SHIP_ORDER_SUCCESS, 
    SHIP_ORDER_FAILURE,
    CANCELLED_ORDER_REQUEST,
    CANCELLED_ORDER_SUCEESS,
    CANCELLED_ORDER_FAILURE
} from "./ActionType";

const initialState={
    orders:[],
    loading:false,
    error:null,
}

export const adminOrderReducer=(state=initialState,action)=>
{
    switch(action.type)
    {
        case GET_ORDERS_REQUEST:
            return {...state,loading:true,error:null}
        case GET_ORDERS_SUCCESS:
            return {...state,loading:false,error:null,orders:action.payload}
        case GET_ORDERS_FAILURE:
            return {loading:false,error:action.payload,orders:[]}
        
        case CONFIRMED_ORDER_REQUEST:
        case PLACED_ORDER_REQUEST:
        case DELIVERED_ORDER_REQUEST:
        case CANCELLED_ORDER_REQUEST:
            return {...state,loading:true,error:null}
        case CONFIRMED_ORDER_SUCEESS:
            return {...state,loading:false,confirmed:action.payload}
         
        case PLACED_ORDER_SUCCESS:
            return {loading:false,error:null,placed: action.payload}
        case DELIVERED_ORDER_SUCCESS:
            return {...state,loading:false,delivered: action.payload}
        case CANCELLED_ORDER_SUCEESS:
            return {loading:false,cancelled: action.payload}
        case CONFIRMED_ORDER_FAILURE:
        case PLACED_ORDER_FAILURE:
        case DELIVERED_ORDER_FAILURE:
        case CANCELLED_ORDER_FAILURE:
            return {...state,loading:false,error:action.payload}
        case DELETE_ORDER_REQUEST:
            return {...state,loading:true}
        case DELETE_ORDER_SUCCESS:
            return {...state,loading:false,deleteOrder: action.payload}
        case DELETE_ORDER_FAILURE:
            return {...state,loading:false,error:action.payload}
        case SHIP_ORDER_REQUEST:
            return {...state,loading:true,error:null}
        case SHIP_ORDER_SUCCESS:
            return {...state,loading:false,shipped:action.payload}
        case SHIP_ORDER_FAILURE:
            return {...state,loading:false,error:action.payload}
        default:
            return state;
    }
}

export default adminOrderReducer;