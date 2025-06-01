import { act } from "react";
import {
    DELETE_PRODUCT_SUCCESS,
    FIND_ALL_PRODUCTS_BY_FAILURE,
    FIND_ALL_PRODUCTS_BY_REQUEST,
    FIND_ALL_PRODUCTS_BY_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    FIND_PRODUCTS_BY_FAILURE,
    FIND_PRODUCTS_BY_REQUEST,
    FIND_PRODUCTS_BY_SUCCESS,
    FIND_PRODUCTS_BY_SEARCH_FAILURE,
    FIND_PRODUCTS_BY_SEARCH_REQUEST,
    FIND_PRODUCTS_BY_SEARCH_SUCCESS,
    FIND_PRODUCTS_BY_CATEGORY_REQUEST,
    FIND_PRODUCTS_BY_CATEGORY_SUCCESS,
    FIND_PRODUCTS_BY_CATEGORY_FAILURE,
} from "./ActionType";

const initialState={
    products:[],
    searchedProducts: { data: [], total: 0 },
    homepageProducts: [],
    product:null,
    loading:false,
    error:null,
}

export const customerProductReducer=(state=initialState,action)=>
{
    switch(action.type)
    {
        case FIND_PRODUCTS_BY_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
        case FIND_ALL_PRODUCTS_BY_REQUEST:
        case FIND_PRODUCTS_BY_SEARCH_REQUEST:
        case FIND_PRODUCTS_BY_CATEGORY_REQUEST:    
            return {...state,loading:true,error:null}
        case FIND_PRODUCTS_BY_SUCCESS:
            return {...state,loading:false,error:null,products:action.payload}
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return {...state,loading:false,error:null,product:action.payload}
        case FIND_PRODUCTS_BY_CATEGORY_SUCCESS:
            return {...state,loading:false,error:null,homepageProducts:action.payload}
        case FIND_PRODUCTS_BY_FAILURE:
        case FIND_ALL_PRODUCTS_BY_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
        case FIND_PRODUCTS_BY_SEARCH_FAILURE:
        case FIND_PRODUCTS_BY_CATEGORY_FAILURE:
            return {...state,loading:false,error:action.payload}
        case FIND_ALL_PRODUCTS_BY_SUCCESS:
            return {...state, loading: false, error: null, products: action.payload };           
        case DELETE_PRODUCT_SUCCESS:
            return {...state,loading:false,error:null,deletedProduct: action.payload}
        case FIND_PRODUCTS_BY_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                searchedProducts: action.payload
            };
        default:
            return state;
    }
}