import axios from "axios";
import { API_BASE_URL } from "../../../config/apiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILURE,
  LOGOUT
} from "./ActionType";


// Login Actions
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });


export const login = (userData,navigate) => async (dispatch) => {

  dispatch(loginRequest());
//   console.log(userData)  
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/admin/signin`, userData);
    const user = response.data;
    console.log(user.jwt);
    console.log(user);

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    // console.log(user);
    dispatch(loginSuccess(user));

    if (user && user.jwt) 
    {navigate("/admin");
    }

    
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Get User Actions
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;
    // console.log(user);
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};


// Fetch All Users
export const getAllUsers = () => async (dispatch) => { 
  dispatch({ type: GET_ALL_USER_REQUEST });

  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/admin/customers/all`);
    console.log("Fetched Users:", data);

    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data }); // <-- FIX: Ensure payload is set correctly
  } catch (error) {
    dispatch({ type: GET_ALL_USER_FAILURE, payload: error.message });
  }
};


// Logout Action
export const logout = (navigate) => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT, payload: null });
  window.location.replace("/admin/login");
  // navigate('/admin/login')
};
