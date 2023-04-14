import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  GET_CUSTOMERS,
  ADD_NEW_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_STATUS,
} from "./actionTypes";
import {
  getCustomersFail,
  getCustomersSuccess,
  getStatusSuccess,
  getStatusFail,
  addCustomerFail,
  addCustomerSuccess,
  updateCustomerSuccess,
  updateCustomerFail,
  deleteCustomerSuccess,
  deleteCustomerFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCustomers,
  getStatus,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
} from "helpers/backend_helper";
import toastr from "toastr";

function* fetchCustomers() {
  try {
    const response = yield call(getCustomers);
    yield put(getCustomersSuccess(response["users"]));
  } catch (error) {
    yield put(getCustomersFail(error));
  }
}

function* fetchSatus() {
  try {
    const response = yield call(getStatus);
    yield put(getStatusSuccess(response["users"]));
  } catch (error) {
    yield put(getStatusFail(error));
  }
}


function* onUpdateCustomer({ payload: customer }) {
  try {
    const response = yield call(updateCustomer, customer);
    yield put(updateCustomerSuccess(response));
  } catch (error) {
    yield put(updateCustomerFail(error));
  }
}

function* onDeleteCustomer({ payload: customer }) {
  try {
    const response = yield call(deleteCustomer, customer);
    yield put(deleteCustomerSuccess(response));
  } catch (error) {
    yield put(deleteCustomerFail(error));
  }
}

function* onAddNewCustomer({ payload: {customer, history} }) {
  try {
    const response = yield call(addNewCustomer, customer);
    yield put(addCustomerSuccess(response.success));
    if (response?.success===true){
      history.push("/employee");
      location.reload();
    }
  } catch (error) {
    yield put(addCustomerFail(error));
  }
}

function* ecommerceSaga() {
  yield takeEvery(GET_CUSTOMERS, fetchCustomers);
  yield takeEvery(GET_STATUS, fetchSatus);
  yield takeEvery(ADD_NEW_CUSTOMER, onAddNewCustomer);
  yield takeEvery(UPDATE_CUSTOMER, onUpdateCustomer);
  yield takeEvery(DELETE_CUSTOMER, onDeleteCustomer);
}

export default ecommerceSaga;
