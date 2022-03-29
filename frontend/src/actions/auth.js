import {
  LOGIN_SUCCESS,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_STATE,
} from "./actionTypes";

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
}
export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user: user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}
export function clearAuth() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
