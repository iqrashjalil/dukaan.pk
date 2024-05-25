import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  CLEAR_ERRORS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from "../constants/orderConstant";
import serverUrl from "../serverUrl";

//* Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.post(
      `${serverUrl}/api/order/neworder`,
      order,
      config
    );
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });
    const config = {
      withCredentials: true,
    };
    const response = await axios.get(`${serverUrl}/api/order/myorders`, config);
    dispatch({
      type: MY_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Get All Orders (admin only)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_REQUEST });
    const config = {
      withCredentials: true,
    };
    const response = await axios.get(
      `${serverUrl}/api/order/admin/orders`,
      config
    );
    dispatch({
      type: ALL_ORDER_SUCCESS,
      payload: response.data.orders,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.put(
      `${serverUrl}/api/order/admin/order/${id}`,
      order,
      config
    );
    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: response.data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.delete(
      `${serverUrl}/api/order/admin/order/${id}`,
      config
    );
    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: response.data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//*  Order Details
export const orderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const config = {
      withCredentials: true,
    };
    const response = await axios.get(
      `${serverUrl}/api/order/order/${id}`,
      config
    );
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: response.data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
