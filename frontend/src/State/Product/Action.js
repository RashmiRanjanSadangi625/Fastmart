import { api, API_BASE_URL } from "../../config/apiConfig";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
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

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_BY_REQUEST });

  // console.log(reqData);
  
  const {
    category,
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  // console.log(category);
  const params = {
    category: category || undefined,
    color: colors || undefined,
    sizes: sizes?.length ? sizes.join(",") : undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    minDiscount: minDiscount || undefined,
    stock: stock || undefined,
    sort: sort || undefined,
    pageNumber: Number(pageNumber) || 1,
    pageSize: Number(pageSize) || 10
};


try
{
    const { data } = await api.get("/api/products", { params });

    console.log(data);     
      dispatch({type:FIND_PRODUCTS_BY_SUCCESS,payload:data})
  } catch (error) {
    dispatch({type:FIND_PRODUCTS_BY_FAILURE ,payload:error.message})
  }
};
export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: FIND_ALL_PRODUCTS_BY_REQUEST });

  try {
    const { data } = await api.get(`/api/products`);   

    dispatch({type: FIND_ALL_PRODUCTS_BY_SUCCESS,payload: data});
  } catch (error) {
    dispatch({
      type: FIND_ALL_PRODUCTS_BY_FAILURE,
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};


export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST});
    
    const { productId} = reqData;
    try {
      const { data } = await api.get(
        `/api/products/id/${productId}`);       
  
  
        dispatch({type: FIND_PRODUCT_BY_ID_SUCCESS,payload:data})
    } catch (error) {
      dispatch({type: FIND_PRODUCT_BY_ID_FAILURE ,payload:error.message})
    }
  };

  export const createProduct = (product) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST});

    try {
      const { data } = await api.post(
        `/api/admin/products`,product);       
  
  
        dispatch({type: CREATE_PRODUCT_SUCCESS,payload:data})
    } catch (error) {
      dispatch({type: CREATE_PRODUCT_FAILURE ,payload:error.message})
    }
  };

  export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST});

    // console.log(productId);
    

    try {
      const { data } = await api.delete(
        `/api/admin/products/delete/${productId}`);       
  
        dispatch({type: DELETE_PRODUCT_SUCCESS,payload:productId})
    } catch (error) {
      dispatch({type: DELETE_PRODUCT_FAILURE ,payload:error.message})
    }
  };


export const searchedProducts = (searchedQuery,gender, page) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_BY_SEARCH_REQUEST });

  try {
    const { data } = await api.get(`/api/products/search`, {
      params: { query: searchedQuery, gender:gender,page: page },
    });

    console.log('action data',data)

    dispatch({ type: FIND_PRODUCTS_BY_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_BY_SEARCH_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const productsSearchByCategory = (categoryNames) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_BY_CATEGORY_REQUEST });

  try {
    const { data } = await api.post(`/api/products/category`, { categoryNames }); 
    dispatch({ type: FIND_PRODUCTS_BY_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_BY_CATEGORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


