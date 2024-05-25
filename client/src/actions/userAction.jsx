import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
} from "../constants/userConstant.jsx";
import serverUrl from ".././serverUrl.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//* Login Action
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const response = await axios.post(
      `${serverUrl}/api/auth/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Register Action
export const registerUser = (formDataToSend) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const response = await axios.post(
      `${serverUrl}/api/auth/register`,
      formDataToSend,
      config
    );
    toast.success("Registration Successful");
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_REQUEST });

    const response = await axios.get(`${serverUrl}/api/auth/getuser`, {
      withCredentials: true,
    });

    dispatch({ type: LOAD_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: LOAD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Logout  User
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`${serverUrl}/api/auth/logout`, {
      withCredentials: true,
    });

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Update User
export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };
    const response = await axios.put(
      `${serverUrl}/api/auth/updateuser`,
      userData,
      config
    );
    toast.success("Updated Successfully");
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Update Password

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = await axios.put(
      `${serverUrl}/api/auth/password/update`,
      passwords,
      config
    );
    toast.success("Updated Successfully");
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: response.data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
//* Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const response = await axios.post(
      `${serverUrl}/api/auth/password/forget`,
      email,
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data.success });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const response = await axios.put(
      `${serverUrl}/api/auth/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });

    const response = await axios.get(`${serverUrl}/api/auth/admin/getalluser`, {
      withCredentials: true,
    });

    dispatch({ type: ALL_USER_SUCCESS, payload: response.data.users });
  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Get User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const response = await axios.get(`${serverUrl}/api/auth/admin/user/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Update User

export const updateProfile = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = await axios.put(
      `${serverUrl}/api/auth/admin/user/${id}`,
      userData,
      config
    );
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Delete User

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROFILE_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = await axios.delete(
      `${serverUrl}/api/auth/admin/user/${id}`,
      config
    );
    dispatch({ type: DELETE_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: DELETE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
