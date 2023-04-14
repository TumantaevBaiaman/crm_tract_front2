import {
    GET_PROFILE,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL
} from "./actionTypes";

export const getProfile = () => ({
    type: GET_PROFILE,
});

export const getProfileSuccess = profile => ({
    type: GET_PROFILE_SUCCESS,
    payload: profile,
})

export const getProfileFail = error => ({
  type: GET_PROFILE_FAIL,
  payload: error,
})

export const updateProfile = profile => ({
  type: UPDATE_PROFILE,
  payload: profile,
})

export const updateProfileSuccess = profile => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: profile,
})

export const updateProfileFail = error => ({
  type: UPDATE_PROFILE_FAIL,
  payload: error,
})