import {REGISTER_USER_IN_ACCOUNT, REGISTER_USER_IN_ACCOUNT_SUCCESSFUL, REGISTER_USER_IN_ACCOUNT_FAILED} from "./actionTypes";

const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
}

const account2 = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_IN_ACCOUNT:
      state = {
        ...state,
        loading: true,
        registrationError: null,
      }
      break
    case REGISTER_USER_IN_ACCOUNT_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        registrationError: null,
      }
      break
    case REGISTER_USER_IN_ACCOUNT_FAILED:
      state = {
        ...state,
        user: null,
        loading: false,
        registrationError: action.payload,
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default account2