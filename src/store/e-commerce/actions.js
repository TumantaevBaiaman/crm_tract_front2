import {
  GET_CUSTOMERS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_NEW_CUSTOMER,
  GET_STATUS,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  GET_STATUS_SUCCESS, GET_STATUS_FAIL
} from "./actionTypes"

export const getCustomers = () => ({
  type: GET_CUSTOMERS,
})

export const getCustomersSuccess = customers => ({
  type: GET_CUSTOMERS_SUCCESS,
  payload: customers,
})

export const getStatusSuccess = status => ({
  type: GET_STATUS_SUCCESS,
  payload: status,
})

export const getStatusFail = error => ({
  type: GET_STATUS_FAIL,
  payload: error,
})

export const getCustomersFail = error => ({
  type: GET_CUSTOMERS_FAIL,
  payload: error,
})

export const addNewCustomer = (customer, history) => ({
  type: ADD_NEW_CUSTOMER,
  payload: { customer, history },
})

export const getStatus = () => ({
  type: GET_STATUS,
})

export const addCustomerSuccess = customer => ({
  type: ADD_CUSTOMER_SUCCESS,
  payload: customer,
})

export const addCustomerFail = error => ({
  type: ADD_CUSTOMER_FAIL,
  payload: error,
})

export const updateCustomer = customer => ({
  type: UPDATE_CUSTOMER,
  payload: customer,
})

export const updateCustomerSuccess = customer => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: customer,
})

export const updateCustomerFail = error => ({
  type: UPDATE_CUSTOMER_FAIL,
  payload: error,
})

export const deleteCustomer = customer => ({
  type: DELETE_CUSTOMER,
  payload: customer,
})

export const deleteCustomerSuccess = customer => ({
  type: DELETE_CUSTOMER_SUCCESS,
  payload: customer,
})

export const deleteCustomerFail = error => ({
  type: DELETE_CUSTOMER_FAIL,
  payload: error,
})