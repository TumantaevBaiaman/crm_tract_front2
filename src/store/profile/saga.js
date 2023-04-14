import { call, put, takeEvery } from "redux-saga/effects"

import { GET_PROFILE, UPDATE_PROFILE} from "./actionTypes";

import {
    getProfileSuccess,
    getProfileFail,
    updateProfileSuccess,
    updateProfileFail,
} from "./actions";

import {getProfile, updateProfile} from "../../helpers/backend_helper";
import Ge from "react-datepicker";

function* fetchProfile() {
  try {
    const response = yield call(getProfile)
    yield put(getProfileSuccess(response))
  } catch (error) {
    yield put(getProfileFail(error))
  }
}

function* onUpdateProfile({ payload: profile }) {
  try {
    const response = yield call(updateProfile, profile)
    yield put(updateProfileSuccess(response))
  } catch (error) {
    yield put(updateProfileFail(error))
  }
}

function* profileSaga() {
    yield takeEvery(GET_PROFILE, fetchProfile)
    yield takeEvery(UPDATE_PROFILE, onUpdateProfile)
}

export default profileSaga;