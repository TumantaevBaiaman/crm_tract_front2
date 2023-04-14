import {call, put, takeEvery} from "redux-saga/effects";
import {addNewMyAccount, updateAccount} from "../../helpers/backend_helper";
import {addAccountSuccess, addAccountFail} from "./actions";
import {ADD_NEW_ACCOUNT, UPDATE_ACCOUNT} from "./actionTypes";
import toastr from "toastr";

function* onAddNewAccount({ payload: {account, history} }) {

  try {
    const response = yield call(addNewMyAccount, account)
    yield put(addAccountSuccess(response))
  } catch (error) {
    yield put(addAccountFail(error))
    toastr.error("Error Create Account")
  }
}

function* UpdateAccount({ payload: {account, history} }) {

  try {
    const response = yield call(updateAccount, account)
    yield put(addAccountSuccess(response))
    history.push("/register/account");
    toastr.success("Success Update Account")
  } catch (error) {
    yield put(addAccountFail(error))
    toastr.error("Error Update Account")
  }
}

function* company() {
  yield takeEvery(ADD_NEW_ACCOUNT, onAddNewAccount);
  yield takeEvery(UPDATE_ACCOUNT, UpdateAccount)
}

export default company;