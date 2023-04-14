import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER_IN_ACCOUNT } from "./actionTypes"
import { registerUserAccountSuccessful, registerUserAccountFailed } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postJwtRegister, postJwtRegisterStep2,
} from "../../../helpers/backend_helper"

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend()

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  console.info("using the following url for registration: ")
  try {
    console.info("Trying to register user (within try block)")
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.registerUser,
        user.email,
        user.password
      )
      yield put(registerUserAccountSuccessful(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtRegisterStep2, user)
      yield put(registerUserAccountSuccessful(response))
    }
  } catch (error) {
    console.log("There was an error registering: ", error)
    yield put(registerUserAccountFailed(error))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER_IN_ACCOUNT, registerUser)
}

function* accountSaga2() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga2