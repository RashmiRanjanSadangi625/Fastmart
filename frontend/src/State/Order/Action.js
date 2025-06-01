import { api} from "../../config/apiConfig";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_REQUEST,
  GET_ORDER_HISTORY_REQUEST,
  GET_ORDER_HISTORY_SUCCESS,
  GET_ORDER_HISTORY_FAILURE 
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
   
    // console.log(reqData.navigate);
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const {data} = await api.post(`/api/orders/`, reqData.address);
        // console.log(data);
        if(data._id)
        {
            reqData.navigate({search:`step=3&order_id=${data._id}`})
        }
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    }
  };

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });   
    // console.log("get order id",orderId);

  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    // console.log("get order by id",data);
    
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
  }
};

export const getAllUserOrders = () => async (dispatch) => {
  dispatch({ type: GET_ALL_ORDERS_REQUEST });   
  
try {
  // console.log("get order by id");
  const { data } = await api.get(`api/account/user`);
  // console.log("get all orders for user",data);
  
  dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data });
} catch (error) {
  dispatch({ type: GET_ALL_ORDERS_FAILURE, payload: error.message }); 
}
};


export const getOrdersStatusData = (orderStatus) => async (dispatch) => { 
  
  dispatch({ type: GET_ORDER_HISTORY_REQUEST });

  try {
    const { data } = await api.get(`/api/orders/status/${orderStatus}`);

    // console.log('data',data);
    dispatch({ type: GET_ORDER_HISTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORDER_HISTORY_FAILURE, payload: error.message });
  }
};
