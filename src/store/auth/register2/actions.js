import { REGISTER_USER_IN_ACCOUNT, REGISTER_USER_IN_ACCOUNT_SUCCESSFUL, REGISTER_USER_IN_ACCOUNT_FAILED } from "./actionTypes"

export const registerUserAccount = user => {
  return {
    type: REGISTER_USER_IN_ACCOUNT,
    payload: { user },
  }
}

export const registerUserAccountSuccessful = user => {
  return {
    type: REGISTER_USER_IN_ACCOUNT_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserAccountFailed = user => {
  return {
    type: REGISTER_USER_IN_ACCOUNT_FAILED,
    payload: user,
  }
}