import {
    ADD_CUSTOMER_DATA,
    ADD_CUSTOMER_DATA_SUCCESS,
    ADD_CUSTOMER_DATA_FAIL,
    GET_CUSTOMER_DATA,
    GET_CUSTOMER_DATA_SUCCESS,
    GET_CUSTOMER_DATA_FAIL,
    GET_CUSTOMER_DETAIL,
    GET_CUSTOMER_DETAIL_SUCCESS,
    GET_CUSTOMER_DETAIL_FAIL,
    UPDATE_CUSTOMER_DATA,
    UPDATE_CUSTOMER_DATA_SUCCESS,
    UPDATE_CUSTOMER_DATA_FAIL,
    DELETE_CUSTOMER_DATA,
    DELETE_CUSTOMER_DATA_SUCCESS,
    DELETE_CUSTOMER_DATA_FAIL
} from "./actionTypes";

export const addNewCustomerData = (customer, history) => ({
  type: ADD_CUSTOMER_DATA,
  payload: {customer, history},
})

export const addCustomerDataSuccess = customer => ({
  type: ADD_CUSTOMER_DATA_SUCCESS,
  payload: customer,
})

export const addCustomerDataFail = error => ({
  type: ADD_CUSTOMER_DATA_FAIL,
  payload: error,
})

export const getCustomersData = () => ({
  type: GET_CUSTOMER_DATA,
})

export const getCustomersDataSuccess = customers => ({
  type: GET_CUSTOMER_DATA_SUCCESS,
  payload: customers,
})

export const getCustomerDataFail = error => ({
  type: GET_CUSTOMER_DATA_FAIL,
  payload: error,
})

export const getCustomerDetail = customerId => ({
    type: GET_CUSTOMER_DETAIL,
    customerId,
})

export const getCustomerDetailSuccess = customers => ({
    type: GET_CUSTOMER_DETAIL_SUCCESS,
    payload: customers,
})

export const getCustomerDetailFail = error => ({
    type: GET_CUSTOMER_DETAIL_FAIL,
    payload: error,
})

export const updateCustomersData = customer => ({
  type: UPDATE_CUSTOMER_DATA,
  payload: customer,
})

export const updateCustomersDataSuccess = customer => ({
  type: UPDATE_CUSTOMER_DATA_SUCCESS,
  payload: customer,
})

export const updateCustomerDataFail = error => ({
  type: UPDATE_CUSTOMER_DATA_FAIL,
  payload: error,
})

export const deleteCustomerData = (customer, history) => ({
  type: DELETE_CUSTOMER_DATA,
  payload: {customer, history},
})

export const deleteCustomerDataSuccess = customer => ({
  type: DELETE_CUSTOMER_DATA_SUCCESS,
  payload: customer,
})

export const deleteCustomerDataFail = error => ({
  type: DELETE_CUSTOMER_DATA_FAIL,
  payload: error,
})

