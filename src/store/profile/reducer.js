import {
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL
} from "./actionTypes";

const INIT_STATE = {
    profile: {},
    error: {},
}

const ProfileUser = (state= INIT_STATE, action) => {
    switch (action.type){

        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
            }

        case GET_PROFILE_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload
            }

        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        default:
            return state
    }
}

export default ProfileUser;