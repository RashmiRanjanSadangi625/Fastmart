import { api } from "../../config/apiConfig";
import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCEESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";


export const getCart = () => async (dispatch) => {
    dispatch({ type: GET_CART_REQUEST });
  
    try {
      const { data } = await api.get("/api/cart");

      dispatch({ type: GET_CART_SUCEESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_CART_FAILURE, payload: error.message });
    }
  };

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });

  console.log("cart sent",reqData)
 
  try {
    const { data } = await api.put("/api/cart/add", reqData);
    console.log("console",data);
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
    
    
  } catch (error) {
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};

export const removeCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQUEST });

  try 
  {
    await api.delete(`/api/cart_items/${reqData.cartItemId}`); // ✅ No data in DELETE request

    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: reqData.cartItemId }); // ✅ Corrected payload
  } catch (error) 
  {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.message });
    console.error("Error removing cart item:", error);
  }
};


export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  console.log("reqData",reqData)

  try {
    const { data } =await api.put(
      `/api/cart_items/${reqData.cartItemId}`,
      reqData.data
    );
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.message });
  }
};


