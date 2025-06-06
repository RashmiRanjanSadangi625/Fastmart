import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  LOGOUT
} from "./ActionType";

// Register Actions
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
//   console.log(user.jwt);
  
  try {
    // console.log(userData);
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    console.log(user);
    
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    // console.log(user);
    dispatch(registerSuccess(user));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

// Login Actions
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => { 
  dispatch(loginRequest());
  // console.log(userData)  
  try {
    
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    console.log(user.jwt);
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    console.log('user',user);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Get User Actions
const getUserRequest = () => ({ type: GET_USER_REQUEST});
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({type: GET_USER_FAILURE , payload: error });


export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const token = localStorage.getItem("jwt");
    console.log('token',token);
    
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

//Password reset

// Get Update Actions
const forgotPasswordRequest= () => ({ type: FORGOT_PASSWORD_REQUEST  });
const forgotPasswordSuccess = (ack) => ({ type: FORGOT_PASSWORD_SUCCESS, payload: ack });
const forgotPasswordFailure = (error) => ({ type: FORGOT_PASSWORD_FAILURE, payload: error });

export const forgotUserPassword = ({email})=> async (dispatch)=>
{
  dispatch(forgotPasswordRequest());
  // console.log(email);
  
  try 
  {
    const res = await axios.post(`${API_BASE_URL}/auth/forgotPassword`,{email})
    const ack = res;

    // console.log('ack',ack)

    dispatch(forgotPasswordSuccess(ack));
  } catch (error) { dispatch(forgotPasswordFailure(error.message)) }
}

//Password reset

const updatePasswordRequest= () => ({ type: UPDATE_PASSWORD_REQUEST  });
const updatePasswordSuccess = (ack) => ({ type: UPDATE_PASSWORD_SUCCESS, payload: ack });
const updatePasswordFailure = (error) => ({ type: UPDATE_PASSWORD_FAILURE, payload: error });

export const updatePassword = ({email,password,token})=> async (dispatch)=>
  {
    dispatch(updatePasswordRequest());
    console.log(email + ' - > ' + password);
    try 
    {
      const res = await axios.post(`${API_BASE_URL}/auth/resetPassword`,{email,password,token});
      console.log('res',res)
      const ack = res.data;
      dispatch(updatePasswordSuccess(ack));
    } catch (error) { dispatch(updatePasswordFailure(error.message)) }
  }
  

// Logout Action
export const logout = () => (dispatch) => {
  localStorage.clear('jwt');
  dispatch({ type: LOGOUT, payload: null });
  // window.location.replace("/");
};
